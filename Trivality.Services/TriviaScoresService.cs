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
    public class TriviaScoresService : BaseService
    {
        public void Insert(TriviaScoresAddRequest model)
        {
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "TriviaScores_Insert";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AccountId", model.AccountId);
                    cmd.Parameters.AddWithValue("@Correct", model.Correct);
                    cmd.Parameters.AddWithValue("@Total", model.Total);
                    cmd.Parameters.AddWithValue("@Category", model.Category);
                    cmd.Parameters.AddWithValue("@Difficulty", model.Difficulty);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    conn.Close();
                }
            }
        }

        public List<TriviaScoresModel> SelectByAccount(int id)
        {
            List<TriviaScoresModel> list = new List<TriviaScoresModel>();
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "TriviaScores_SelectByAccount";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@AccountId", id);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        TriviaScoresModel scoreModel = new TriviaScoresModel();
                        int index = 0;
                        scoreModel.AccountId = reader.GetInt32(index++);
                        scoreModel.Correct = reader.GetInt32(index++);
                        scoreModel.Total = reader.GetInt32(index++);
                        scoreModel.Category = reader.GetString(index++);
                        scoreModel.Difficulty = reader.GetString(index++);
                        scoreModel.CreatedDate = reader.GetDateTime(index++);
                        list.Add(scoreModel);
                    }
                    conn.Close();
                }
            }
            return list;
        }
    }
}
