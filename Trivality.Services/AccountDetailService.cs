using System.Data.SqlClient;
using Trivality.Models.Domain;
using Trivality.Models.View_Models;

namespace Trivality.Services
{
    public class AccountDetailService : BaseService
    {
        public void Insert(AccountDetailModel model)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "Account_Detail_Insert";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AccountId", model.AccountId);
                    cmd.Parameters.AddWithValue("@ProfilePicId", model.ProfilePicId);
                    cmd.Parameters.AddWithValue("@Description", model.Description);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
        }

        public AccountDetailViewModel SelectByAccountId(int accountId)
        {
            AccountDetailViewModel model = new AccountDetailViewModel();
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "Account_Detail_SelectByAccountId";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AccountId", accountId);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while(reader.Read())
                    {
                        int index = 0;
                        model.AccountId = reader.GetInt32(index++);
                        model.ProfilePicId = reader.GetInt32(index++);
                        model.PicturePath = System.Configuration.ConfigurationManager.AppSettings["AwsPath"] + reader.GetString(index++);
                        model.Description = reader.GetString(index++);
                    }
                    conn.Close();
                }
            }
            return model;
        }

        public void Update(AccountDetailModel model)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "Account_Detail_Update";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AccountId", model.AccountId);
                    cmd.Parameters.AddWithValue("@ProfilePicId", model.ProfilePicId);
                    cmd.Parameters.AddWithValue("@Description", model.Description);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
        }
    }
}
