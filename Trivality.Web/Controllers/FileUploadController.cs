using Amazon.S3;
using Amazon.S3.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using Trivality.Models.Requests;
using Trivality.Models.Responses;
using Trivality.Services;

namespace Trivality.Web.Controllers
{
    [RoutePrefix("api/files")]
    public class FileUploadController : ApiController
    {
        static IAmazonS3 client;
        FileUploadService svc = new FileUploadService();

        [Route("uploadtest"), HttpPost]
        public HttpResponseMessage Upload()
        {
            HttpPostedFile postedFile = HttpContext.Current.Request.Files[0];
            string keyName = Path.GetFileNameWithoutExtension(postedFile.FileName) + '_' + Guid.NewGuid().ToString() + Path.GetExtension(postedFile.FileName);
            FileAddRequest fModel = new FileAddRequest
            {
                AccountId = 1,
                FileName = postedFile.FileName,
                Size = postedFile.ContentLength,
                Type = postedFile.ContentType,
                SystemFileName = keyName,
                ModifiedBy = "test"
            };
            
            using (client = new AmazonS3Client(Amazon.RegionEndpoint.USWest1))
            {
                try
                {
                    string bucketName = "trivalitybucket/ProfilePictures";

                    PutObjectRequest putRequest1 = new PutObjectRequest
                    {
                        BucketName = bucketName,
                        Key = keyName
                    };
                    PutObjectResponse response1 = client.PutObject(putRequest1);

                    PutObjectRequest putRequest2 = new PutObjectRequest
                    {
                        BucketName = bucketName,
                        Key = keyName,
                        InputStream = postedFile.InputStream,
                        ContentType = "text/plain"
                    };
                    putRequest2.Metadata.Add("x-amz-meta-title", "someTitle");
                    PutObjectResponse response2 = client.PutObject(putRequest2);

                    svc.Insert(fModel);
                }
                catch (AmazonS3Exception amazonS3Exception)
                {

                    throw amazonS3Exception;
                }
            }


            SuccessResponse resp = new SuccessResponse();
            return Request.CreateResponse(HttpStatusCode.OK, resp);
        }
    }
}