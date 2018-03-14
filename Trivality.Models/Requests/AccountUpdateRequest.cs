using System.ComponentModel.DataAnnotations;

namespace Trivality.Models.Requests
{
    public class AccountUpdateRequest : AccountAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
