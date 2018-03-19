using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trivality.Models.Requests
{
    public class FileAddRequest
    {
        public int AccountId { get; set; }
        public string FileName { get; set; }
        public int Size { get; set; }
        public string Type { get; set; }
        public string SystemFileName { get; set; }
        public string ModifiedBy { get; set; }
    }
}
