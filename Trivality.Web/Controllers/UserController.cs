using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web;
using System.Web.Http;
using Trivality.Models.Domain;
using Trivality.Models.Requests;
using Trivality.Models.Responses;
using Trivality.Services;

namespace Trivality.Web.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        UserService _userSvc;

        public UserController()
        {
            _userSvc = new UserService();
        }

        [Route("logintest"), HttpGet]
        public HttpResponseMessage LoginTest()
        {
            UserModel model = new UserModel();
            model.Id = 1;
            model.Username = "xxSupaKillaxx";
            model.Email = "yomomma@gmail.com";
            _userSvc.LogIn(model);
            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [Route("cookietest"), HttpGet]
        public HttpResponseMessage CookieTest()
        {
            UserModel model = UserService.GetCurrentUser();
            ItemResponse<UserModel> resp = new ItemResponse<UserModel>();
            resp.Item = model;
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("login"), HttpPost]
        public HttpResponseMessage LogIn([FromBody]LoginRequest liModel)
        {
            UserModel model = new UserModel();
            //Check if username/email and password are in db and correct
            int id = _userSvc.GetByUsernameAndPass(liModel);
            if(id > 0)
            {
                model = _userSvc.GetById(id);
                _userSvc.LogIn(model);
                SuccessResponse resp = new SuccessResponse();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "Invalid username or password");
            }
        }

        [Route("register"), HttpPost]
        public HttpResponseMessage Register([FromBody]RegistrationRequest rModel)
        {
            AccountAddRequest model = new AccountAddRequest
            {
                Username = rModel.Username,
                Email = rModel.Email,
                PasswordHash = rModel.Password,
                Salt = "salt",
                ModifiedBy = rModel.Email
            };
            int id = _userSvc.Register(model);
            if(id > 0)
            {
                UserModel uModel = new UserModel
                {
                    Id = id,
                    Username = rModel.Username,
                    Email = rModel.Email
                };
                _userSvc.LogIn(uModel);
            }

            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("logout"), HttpGet]
        public HttpResponseMessage LogOut()
        {
            HttpContext.Current.GetOwinContext().Authentication.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("current"), HttpGet]
        public HttpResponseMessage GetCurrentUser()
        {
            UserModel model = UserService.GetCurrentUser();
            ItemResponse<UserModel> resp = new ItemResponse<UserModel>();
            resp.Item = model;
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("login/facebook"), HttpPost]
        public HttpResponseMessage LoginWithFacebook(FacebookUserAddRequest model)
        {
            int acctId = _userSvc.GetIdByEmail(model.Email);
            if(acctId == 0)
            {
                AccountAddRequest aModel = new AccountAddRequest
                {
                    Username = model.Name,
                    Email = model.Email,
                    PasswordHash = "random password here",
                    Salt = "salt",
                    ModifiedBy = model.Email
                };
                acctId = _userSvc.Register(aModel);
                if (acctId <= 0)
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, "There was an error registering this account");
                }
            }
            UserModel uModel = new UserModel
            {
                Id = acctId,
                Username = model.Name,
                Email = model.Email
            };
            _userSvc.LogIn(uModel);

            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }
    }
}