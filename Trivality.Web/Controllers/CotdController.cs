using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Trivality.Models.Responses;
using Trivality.Models.View_Models;
using Trivality.Services;

namespace Trivality.Web.Controllers
{
    [RoutePrefix("api/cotd")]
    public class CotdController : ApiController
    {
        [Route("getclues"), HttpGet]
        public HttpResponseMessage GetClues()
        {
            CotdService svc = new CotdService();
            ItemListResponse<CotdViewModel> resp = new ItemListResponse<CotdViewModel>();
            resp.Item =  svc.GetClues();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }
    }
}