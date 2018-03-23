using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trivality.Models.Requests
{
    public class TriviaScoresAddRequest
    {
        public int AccountId { get; set; }
        public int Correct { get; set; }
        public int Total { get; set; }
        public string Category { get; set; }
        public string Difficulty { get; set; }
    }
}
