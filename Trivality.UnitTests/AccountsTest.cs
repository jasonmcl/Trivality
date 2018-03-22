using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using Trivality.Models.Domain;
using Trivality.Models.Requests;
using Trivality.Services;

namespace Trivality.UnitTests
{
    [TestClass]
    public class AccountsTest
    {
        [TestMethod]
        public void InsertTest()
        {
            AccountAddRequest model = new AccountAddRequest
            {
                Username = "username",
                Email = "email@email.com",
                ModifiedBy = "Unit Test"
            };
            AccountService svc = new AccountService();
            int result = svc.Insert(model);
            Assert.IsTrue(result > 0);
        }

        [TestMethod]
        public void SelectAllTest()
        {
            AccountService svc = new AccountService();
            List<Account> list = svc.SelectAll();
            Assert.IsTrue(list.Count > 0);
        }

        //[TestMethod]
        //public void SelectByIdTest()
        //{
        //    AccountService svc = new AccountService();
        //    Account result = svc.SelectById(1);
        //    Assert.IsTrue(result.Id > 0);
        //}

        //[TestMethod]
        //public void UpdateTest()
        //{
        //    AccountService svc = new AccountService();
        //    AccountUpdateRequest model = new AccountUpdateRequest
        //    {
        //        Id = 2,
        //        Username = "XxMyNewUserNamexX",
        //        Email = "swagmaster@gmail.com",
        //        ModifiedBy = "unit test"
        //    };

        //    svc.Update(model);
        //    //Account after = svc.SelectById(model.Id);
        //    Assert.IsTrue(model.Email == after.Email);
        //}

        //[TestMethod]
        //public void DeleteTest()
        //{
        //    AccountService svc = new AccountService();
        //    int id = 4;
        //    svc.Delete(id);
        //    //Account after = svc.SelectById(id);
        //    Assert.IsTrue(after.Id == 0);
        //}
    }
}
