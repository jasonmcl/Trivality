using System;
using Trivality.Models.Requests;

namespace Trivality.Models.Domain
{
    public class Account : AccountUpdateRequest
    {
        public DateTime CreatedDate { get; set; }
        public DateTime ModifiedDate { get; set; }
    }
}
