using System.ComponentModel.DataAnnotations;

namespace Trivality.Models.Requests
{
    public class AccountAddRequest
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Email { get; set; }
        public string ModifiedBy { get; set; }
    }
}
