using System;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Trivality.Models.Domain;
using Trivality.Models.Requests;
using Trivality.Models.Responses;
using Trivality.Models.View_Models;
using Trivality.Services;

namespace Trivality.Web.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {
        AccountService svc;
        AccountDetailService adSvc;
        public AccountsController()
        {
            svc = new AccountService();
            adSvc = new AccountDetailService();
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            try
            {
                ItemListResponse<Account> resp = new ItemListResponse<Account>();
                resp.Item = svc.SelectAll();
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            try
            {
                ItemResponse<Account> resp = new ItemResponse<Account>();
                //resp.Item = svc.SelectById(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route, HttpPost]
        public HttpResponseMessage Post([FromBody]AccountAddRequest model)
        {
            try
            {
                if(ModelState.IsValid)
                {
                    ItemResponse<int> resp = new ItemResponse<int>();
                    model.ModifiedBy = "API";
                    resp.Item = svc.Insert(model);
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Put(int id, [FromBody]AccountUpdateRequest model)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    model.ModifiedBy = "Temp Modifier";
                    svc.Update(model);
                    SuccessResponse resp = new SuccessResponse();
                    return Request.CreateResponse(HttpStatusCode.OK, resp);
                }
                else
                {
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                SuccessResponse resp = new SuccessResponse();
                svc.Delete(id);
                return Request.CreateResponse(HttpStatusCode.OK, resp);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex.Message);
            }
        }

        [Route("getprofile"), HttpGet]
        public HttpResponseMessage GetProfile()
        {
            int id = UserService.GetCurrentUser().Id;

            ItemResponse<AccountDetailViewModel> resp = new ItemResponse<AccountDetailViewModel>();
            resp.Item = adSvc.SelectByAccountId(id);
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("updateprofile"), HttpPost]
        public HttpResponseMessage UpdateProfile([FromBody]AccountDetailModel model)
        {
            model.AccountId = UserService.GetCurrentUser().Id;
            adSvc.Update(model);
            ItemResponse<AccountDetailViewModel> resp = new ItemResponse<AccountDetailViewModel>();
            resp.Item = adSvc.SelectByAccountId(model.AccountId);
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }
    }
}