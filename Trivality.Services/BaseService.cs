namespace Trivality.Services
{
    public class BaseService
    {
        protected string connStr = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
    }
}
