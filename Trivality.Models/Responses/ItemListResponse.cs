using System.Collections.Generic;

namespace Trivality.Models.Responses
{
    public class ItemListResponse<T> : SuccessResponse
    {
        public List<T> Item { get; set; }
    }
}
