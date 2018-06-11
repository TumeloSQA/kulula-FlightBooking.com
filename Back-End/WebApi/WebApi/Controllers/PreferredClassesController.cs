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

namespace WebApi.Controllers
{
    public class PreferredClassesController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/PreferredClasses
        [AllowAnonymous]
        public IQueryable<Object> GetPreferredClasses()
        {
            
            var PreferredClass = db.PreferredClasses.Select(x => new { x.PreferredClassID,x.AirportID, x.PreferredClassType,x.FlightType,x.Price,x.Quantity,x.Total});
            
            return PreferredClass;
        }

        // GET: api/PreferredClasses/5
        [AllowAnonymous]
        [ResponseType(typeof(PreferredClass))]
        public IHttpActionResult GetPreferredClass(int id)
        {
           //referredClass preferredClass = db.PreferredClasses.Find(id);
            var preferredClass = db.PreferredClasses.Where(x => x.PreferredClassID == id).Select(i => new { i.PreferredClassType});
            if (preferredClass == null)
            {
                return NotFound();
            }

            return Ok(preferredClass);
        }

        // PUT: api/PreferredClasses/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPreferredClass(int id, PreferredClass preferredClass)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != preferredClass.PreferredClassID)
            {
                return BadRequest();
            }

            db.Entry(preferredClass).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PreferredClassExists(id))
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

        // POST: api/PreferredClasses
        [AllowAnonymous]
        [ResponseType(typeof(PreferredClass))]
        public IHttpActionResult PostPreferredClass(PreferredClass preferredClass)
        {
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/

            db.PreferredClasses.Add(preferredClass);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = preferredClass.PreferredClassID }, preferredClass);
        }

        // DELETE: api/PreferredClasses/5
        [AllowAnonymous]
        [ResponseType(typeof(PreferredClass))]
        public IHttpActionResult DeletePreferredClass(int id)
        {
            PreferredClass preferredClass = db.PreferredClasses.Find(id);
            if (preferredClass == null)
            {
                return NotFound();
            }

            db.PreferredClasses.Remove(preferredClass);
            db.SaveChanges();

            return Ok(preferredClass);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PreferredClassExists(int id)
        {
            return db.PreferredClasses.Count(e => e.PreferredClassID == id) > 0;
        }
    }
}