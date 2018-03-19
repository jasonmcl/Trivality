using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Trivality.Models.Requests;

namespace Trivality.Services
{
    public class FileUploadService : BaseService
    {
        public int Insert(FileAddRequest model)
        {
            int id = 0;

            using(SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "Files_Insert";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter param = new SqlParameter();
                    param.ParameterName = "@Id";
                    param.SqlDbType = System.Data.SqlDbType.Int;
                    param.Direction = System.Data.ParameterDirection.Output;
                    cmd.Parameters.Add(param);
                    cmd.Parameters.AddWithValue("@AccountId", model.AccountId);
                    cmd.Parameters.AddWithValue("@FileName", model.FileName);
                    cmd.Parameters.AddWithValue("@Size", model.Size);
                    cmd.Parameters.AddWithValue("@Type", model.Type);
                    cmd.Parameters.AddWithValue("@SystemFileName", model.SystemFileName);
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
