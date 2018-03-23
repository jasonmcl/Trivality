using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Trivality.Models.Domain;
using Trivality.Models.Requests;
using Trivality.Models.Responses;
using Trivality.Services;

namespace Trivality.Web.Controllers
{
    [RoutePrefix("api/scores")]
    public class TriviaScoresController : ApiController
    {
        private TriviaScoresService svc;

        public TriviaScoresController()
        {
            svc = new TriviaScoresService();
        }

        [Route, HttpPost]
        public HttpResponseMessage PostScore([FromBody]TriviaScoresAddRequest model)
        {
            model.AccountId = UserService.GetCurrentUser().Id;
            svc.Insert(model);
            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route, HttpGet]
        public HttpResponseMessage GetScoresFromAccount()
        {
            int id = UserService.GetCurrentUser().Id;
            ItemListResponse<TriviaScoresModel> resp = new ItemListResponse<TriviaScoresModel>();
            resp.Item = svc.SelectByAccount(id);
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }
    }
}