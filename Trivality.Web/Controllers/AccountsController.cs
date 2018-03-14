using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Trivality.Models.Domain;
using Trivality.Models.Responses;
using Trivality.Services;

namespace Trivality.Web.Controllers
{
    [RoutePrefix("api/accounts")]
    public class AccountsController : ApiController
    {
        AccountService svc;

        public AccountsController()
        {
            svc = new AccountService();
        }

        [Route, HttpGet]
        public HttpResponseMessage GetAll()
        {
            ItemListResponse<Account> resp = new ItemListResponse<Account>();
            resp.Item = svc.SelectAll();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }

        [Route("{id:int}"), HttpGet]
        public HttpResponseMessage GetById(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Heres your id: " + id);
        }

        [Route, HttpPost]
        public HttpResponseMessage Post([FromBody]string value)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Posted");
        }

        [Route("{id:int}"), HttpPut]
        public HttpResponseMessage Put(int id, [FromBody]string value)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Updated");
        }

        [Route("{id:int}"), HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            return Request.CreateResponse(HttpStatusCode.OK, "Deleted");
        }
    }
}