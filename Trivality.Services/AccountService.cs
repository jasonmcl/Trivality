using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trivality.Models.Requests;

namespace Trivality.Services
{
    public class AccountService
    {
        private string connStr = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
        
        public int Insert(AccountAddRequest model)
        {
            int id = 0;
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdText = "accounts_insert";
                using (SqlCommand cmd = new SqlCommand(cmdText, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = System.Data.SqlDbType.Int;
                    param.Direction = System.Data.ParameterDirection.Output;

                    cmd.Parameters.Add(param);
                    cmd.Parameters.AddWithValue("@Username", model.Username);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@ModifiedBy", model.ModifiedBy);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    id = (int)cmd.Parameters["@Id"].Value;
                    conn.Close();
                }
            }
            return id;
        }
    }
}
