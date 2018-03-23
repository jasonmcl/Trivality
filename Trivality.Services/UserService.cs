using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Trivality.Models.Domain;
using Trivality.Models.Requests;

namespace Trivality.Services
{
    public class UserService : BaseService
    {
        public void LogIn(UserModel model)
        {
            var claims = new List<Claim>();
            claims.Add(new Claim(ClaimTypes.NameIdentifier, model.Id.ToString()));
            claims.Add(new Claim(ClaimTypes.Name, model.Username));
            claims.Add(new Claim(ClaimTypes.Email, model.Email));
            var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);

            AuthenticationProperties props = new AuthenticationProperties
            {
                IsPersistent = true,
                IssuedUtc = DateTime.UtcNow,
                ExpiresUtc = DateTime.UtcNow.AddDays(60),
                AllowRefresh = true
            };

            HttpContext.Current.GetOwinContext().Authentication.SignIn(props, identity);
        }

        public int Register(AccountAddRequest model)
        {
            int id = 0;
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "Accounts_Insert";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    SqlParameter param = new SqlParameter
                    {
                        ParameterName = "@Id",
                        SqlDbType = System.Data.SqlDbType.Int,
                        Direction = System.Data.ParameterDirection.Output
                    };
                    cmd.Parameters.Add(param);
                    cmd.Parameters.AddWithValue("@Username", model.Username);
                    cmd.Parameters.AddWithValue("@Email", model.Email);
                    cmd.Parameters.AddWithValue("@PasswordHash", model.PasswordHash);
                    cmd.Parameters.AddWithValue("@Salt", model.Salt);
                    cmd.Parameters.AddWithValue("@ModifiedBy", model.ModifiedBy);
                    conn.Open();
                    cmd.ExecuteNonQuery();
                    id = (int)cmd.Parameters["@Id"].Value;
                    conn.Close();
                }
            }
            return id;
        }

        public int GetByUsernameAndPass(LoginRequest model)
        {
            int id = 0;
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "Accounts_SelectByUsernameAndPassword";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", model.Username);
                    cmd.Parameters.AddWithValue("@Password", model.Password);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while(reader.Read())
                    {
                        id = reader.GetInt32(0);
                    }
                    conn.Close();
                }
            }
            return id;
        }

        public UserModel GetById(int id)
        {
            UserModel model = new UserModel();
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdText = "accounts_selectbyid";
                using (SqlCommand cmd = new SqlCommand(cmdText, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Id", id);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        int index = 0;
                        model.Id = reader.GetInt32(index++);
                        model.Username = reader.GetString(index++);
                        model.Email = reader.GetString(index++);
                    }
                    conn.Close();
                }
            }
            return model;
        }

        public string GetSalt(string username)
        {
            string salt = null;
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "Accounts_GetSalt";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Username", username);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        salt = reader.GetString(0);
                    }
                    conn.Close();
                }
            }
            return salt;
        }

        public int GetIdByEmail(string email)
        {
            int id = 0;
            using (SqlConnection conn = new SqlConnection(connStr))
            {
                string cmdStr = "accounts_getbyemail";
                using (SqlCommand cmd = new SqlCommand(cmdStr, conn))
                {
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                    cmd.Parameters.AddWithValue("@Email", email);
                    conn.Open();
                    SqlDataReader reader = cmd.ExecuteReader();
                    while (reader.Read())
                    {
                        id = reader.GetInt32(0);
                    }
                    conn.Close();
                }
            }
            return id;
        }

        public static UserModel GetCurrentUser()
        {
            var identity = HttpContext.Current.User.Identity as ClaimsIdentity;

            UserModel model = new UserModel();
            foreach (var claim in identity.Claims)
            {
                switch (claim.Type)
                {
                    case ClaimTypes.NameIdentifier:
                        int id = 0;
                        if (Int32.TryParse(claim.Value, out id))
                        {
                            model.Id = id;
                        }
                        break;
                    case ClaimTypes.Name:
                        model.Username = claim.Value;
                        break;
                    case ClaimTypes.Email:
                        model.Email = claim.Value;
                        break;
                    default: break;
                }
            }

            return model;
        }
    }
}
