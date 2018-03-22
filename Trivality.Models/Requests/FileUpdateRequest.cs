using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trivality.Models.Requests
{
    public class FileUpdateRequest: FileAddRequest
    {
        public int Id { get; set; }
    }
}
