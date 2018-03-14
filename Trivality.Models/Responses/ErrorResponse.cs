namespace Trivality.Models.Responses
{
    public class ErrorResponse : Response
    {
        public ErrorResponse()
        {
            IsSuccessful = false;
        }
    }
}
