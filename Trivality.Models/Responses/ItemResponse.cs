namespace Trivality.Models.Responses
{
    public class ItemResponse<T> : SuccessResponse
    {
        public T Item { get; set; }
    }
}
