using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trivality.Models.Domain
{
    public class AccountDetailModel
    {
        public int AccountId { get; set; }
        public int ProfilePicId { get; set; }
        public string Description { get; set; }
    }
}
