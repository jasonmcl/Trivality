using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trivality.Models.Requests
{
    public class AccountUpdateRequest : AccountAddRequest
    {
        [Required]
        public int Id { get; set; }
    }
}
