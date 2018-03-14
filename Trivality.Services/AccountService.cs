using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trivality.Models.Domain;
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

        public List<Account> SelectAll()
        {
            List<Account> list = new List<Account>();
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdText = "accounts_selectall";
                using(SqlCommand cmd = new SqlCommand(cmdText, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while(reader.Read())
                    {
                        Account model = new Account();
                        int index = 0;
                        model.Id = reader.GetInt32(index++);
                        model.Username = reader.GetString(index++);
                        model.Email = reader.GetString(index++);
                        model.CreatedDate = reader.GetDateTime(index++);
                        model.ModifiedDate = reader.GetDateTime(index++);
                        model.ModifiedBy = reader.GetString(index++);
                        list.Add(model);
                    }
                    conn.Close();
                }
            }
            return list;
        }

        public Account SelectById(int id)
        {
            Account model = new Account();
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdText = "accounts_selectbyid";
                using (SqlCommand cmd = new SqlCommand(cmdText, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", id);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while(reader.Read())
                    {
                        int index = 0;
                        model.Id = reader.GetInt32(index++);
                        model.Username = reader.GetString(index++);
                        model.Email = reader.GetString(index++);
                        model.CreatedDate = reader.GetDateTime(index++);
                        model.ModifiedDate = reader.GetDateTime(index++);
                        model.ModifiedBy = reader.GetString(index++);
                    }
                    conn.Close();
                }
            }
            return model;
        }
    }
}
