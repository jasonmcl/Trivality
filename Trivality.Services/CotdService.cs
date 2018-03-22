using HtmlAgilityPack;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Trivality.Models.View_Models;

namespace Trivality.Services
{
    public class CotdService
    {
        public List<CotdViewModel> GetClues()
        {
            List<CotdViewModel> list = new List<CotdViewModel>();

            Thread t = new Thread(() =>
            {
                string url = @"https://www.jeopardy.com/games/new-york-times-clue-of-the-day";
                var web = new HtmlWeb();
                int origLength = -1;
                var doc = web.LoadFromBrowser(url, html =>
                {
                    if (origLength == -1)
                    {
                        origLength = html.Length;
                    }
                    return html.Length - origLength > 500;
                });
                var questions = doc.DocumentNode.SelectNodes("//*[@class='question']");
                var ans = doc.DocumentNode.SelectNodes("//*[@class='c_answer']");
                questions.RemoveAt(0);

                for (int i = 0; i < questions.Count; i++)
                {
                    CotdViewModel qa = new CotdViewModel();
                    qa.Question = questions[i].InnerText.Replace("&amp;", "&");
                    qa.Answer = ans[i].InnerText.Replace("&amp;", "&");
                    list.Add(qa);
                }
            });
            t.SetApartmentState(ApartmentState.STA);
            t.Start();
            t.Join();

            return list;
        }
    }
}
