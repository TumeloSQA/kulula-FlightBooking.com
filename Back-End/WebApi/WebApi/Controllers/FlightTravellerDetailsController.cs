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
    public class FlightTravellerDetailsController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/FlightTravellerDetails
        [AllowAnonymous]
        public IQueryable<Object> GetFlightTravellerDetails()
        {
            var FlightTravellerDetails = db.FlightTravellerDetails.Select(x => new { x.TravellerID, x.CustomerID, x.SeatNumber, x.Firstname, x.Lastname, x.Dateofbirth, x.Gender, x.Mobilenumber, x.Email });

            return FlightTravellerDetails;
        }

        // GET: api/FlightTravellerDetails/5
        /* [ResponseType(typeof(FlightTravellerDetail))]
         public IHttpActionResult GetFlightTravellerDetail(int id)
         {
             FlightTravellerDetail flightTravellerDetail = db.FlightTravellerDetails.Find(id);
             if (flightTravellerDetail == null)
             {
                 return NotFound();
             }

             return Ok(flightTravellerDetail);
         }*/

        [HttpGet]
        [Route("api/GetFlightTravellerDetails")]
        [AllowAnonymous]
        public IQueryable<Object> GetFlightTravellerDetails(int id)
        {
            var list = db.Users.Join(db.FlightTravellerDetails, trav => trav.CustomerID, ca => ca.CustomerID,
                (trav, ca) => new { TravellerID = ca.TravellerID,
                    CustomerID  = trav.CustomerID,
                    SeatNumber  = ca.SeatNumber,
                    Firstname  = ca.Firstname,
                    Lastname = ca.Lastname,
                    Dateofbirth = ca.Dateofbirth,
                    Gender = ca.Gender,
                    Mobilenumber = ca.Mobilenumber,
                    Email =ca.Email
                }


            );

            var details = list.Where(c => c.CustomerID.Equals(id));

            if (details == null) {
                return (null);
            }

            return details;
        }
        // PUT: api/FlightTravellerDetails/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutFlightTravellerDetail(int id, FlightTravellerDetail flightTravellerDetail)
        {
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/

            if (id != flightTravellerDetail.TravellerID)
            {
                return BadRequest();
            }

            db.Entry(flightTravellerDetail).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FlightTravellerDetailExists(id))
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

        // POST: api/FlightTravellerDetails
        [AllowAnonymous]
        [ResponseType(typeof(FlightTravellerDetail))]
        public IHttpActionResult PostFlightTravellerDetail(FlightTravellerDetail flightTravellerDetail)
        {
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/

            db.FlightTravellerDetails.Add(flightTravellerDetail);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = flightTravellerDetail.TravellerID }, flightTravellerDetail);
        }

        // DELETE: api/FlightTravellerDetails/5
        [AllowAnonymous]
        [ResponseType(typeof(FlightTravellerDetail))]
        public IHttpActionResult DeleteFlightTravellerDetail(int id)
        {
            FlightTravellerDetail flightTravellerDetail = db.FlightTravellerDetails.Find(id);
            if (flightTravellerDetail == null)
            {
                return NotFound();
            }

            db.FlightTravellerDetails.Remove(flightTravellerDetail);
            db.SaveChanges();

            return Ok(flightTravellerDetail);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool FlightTravellerDetailExists(int id)
        {
            return db.FlightTravellerDetails.Count(e => e.TravellerID == id) > 0;
        }
    }
}
