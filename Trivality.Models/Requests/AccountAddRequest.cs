using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

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
