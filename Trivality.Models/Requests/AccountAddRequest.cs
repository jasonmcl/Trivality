namespace Trivality.Models.Requests
{
    public class AccountAddRequest
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Salt { get; set; }
        public string ModifiedBy { get; set; }
    }
}