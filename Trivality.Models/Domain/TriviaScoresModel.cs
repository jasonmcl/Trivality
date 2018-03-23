using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trivality.Models.Requests;

namespace Trivality.Models.Domain
{
    public class TriviaScoresModel: TriviaScoresAddRequest
    {
        public DateTime CreatedDate { get; set; }
    }
}
