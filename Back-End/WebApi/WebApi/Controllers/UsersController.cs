using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebApi.Models;
using System.Web.Http.Cors;
using System.Security.Claims;



namespace WebApi.Controllers
{
   //[EnableCors(origins: "http://localhost:4200/", headers: "*", methods: "*")]
    public class UsersController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        //GET api/User/5
       
        [HttpGet]
        [Route("api/GetUserClaims")]
        [Authorize]
        public User GetUserClaims()
        {
            var identityClaims = (ClaimsIdentity)User.Identity;
            IEnumerable<Claim> claims = identityClaims.Claims;
            User model = new User()
            {
                CustomerID = Convert.ToInt32(identityClaims.FindFirst("CustomerID").Value),
                Firstname = identityClaims.FindFirst("Firstname").Value,
                Lastname = identityClaims.FindFirst("Lastname").Value,
                dateofbirth = identityClaims.FindFirst("dateofbirth").Value,
                Email = identityClaims.FindFirst("Email").Value,
                Gender = identityClaims.FindFirst("Gender").Value,
                MobileNumbers = identityClaims.FindFirst("MobileNumbers").Value,
                UserName = identityClaims.FindFirst("UserName").Value,
                Password = identityClaims.FindFirst("Password").Value
            };
            return model;
        }
        /* public IHttpActionResult GetUser(int id)
         {

            User user = db.Users.Find(id);
               {
                   if (user == null)
                   {
                       return NotFound();
                   }
                   return Ok(user);
               }
         }*/



        // PUT: api/Users/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(int id, User user)
        {
              /*  if (!ModelState.IsValid) {

                return BadRequest();
              }*/
            if (id != user.CustomerID)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [AllowAnonymous]
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            
              db.Users.Add(user);

       
                db.SaveChanges();
            
           

            return CreatedAtRoute("DefaultApi", new { id = user.CustomerID }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(int id)
        {
            User user = db.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.CustomerID == id) > 0;
        }
    }
}