using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
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
            AccountAddRequest model = new AccountAddRequest()
            {
                Username = "username",
                Email = "email@email.com",
                ModifiedBy = "Unit Test"
            };
            AccountService svc = new AccountService();
            int result = svc.Insert(model);
            Assert.IsTrue(result > 0);
        }
    }
}
