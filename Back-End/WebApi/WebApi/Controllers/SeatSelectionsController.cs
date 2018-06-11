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
    public class SeatSelectionsController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/SeatSelections
        [AllowAnonymous]
        public IQueryable<Object> GetSeatSelections()
        {
            var SeatSelection = db.SeatSelections.Select(x => new { x.SeatType, x.SeatNumber, x.Price, x.Quantity, x.Total });
            return db.SeatSelections;
        }

        // GET: api/SeatSelections/5
        [AllowAnonymous]
        [ResponseType(typeof(SeatSelection))]
        public IHttpActionResult GetSeatSelection(string id)
        {
            SeatSelection seatSelection = db.SeatSelections.Find(id);
            if (seatSelection == null)
            {
                return NotFound();
            }

            return Ok(seatSelection);
        }

        // PUT: api/SeatSelections/5
        [AllowAnonymous]
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSeatSelection(string id, SeatSelection seatSelection)
        {
           /* if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }*/

            if (id != seatSelection.SeatNumber)
            {
                return BadRequest();
            }

            db.Entry(seatSelection).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SeatSelectionExists(id))
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

        // POST: api/SeatSelections
        [AllowAnonymous]
        [ResponseType(typeof(SeatSelection))]
        public IHttpActionResult PostSeatSelection(SeatSelection seatSelection)
        {
          /*  if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            */
            db.SeatSelections.Add(seatSelection);
            db.SaveChanges();
           

            return CreatedAtRoute("DefaultApi", new { id = seatSelection.SeatNumber }, seatSelection);
        }

        // DELETE: api/SeatSelections/5
        [AllowAnonymous]
        [ResponseType(typeof(SeatSelection))]
        public IHttpActionResult DeleteSeatSelection(string id)
        {
            SeatSelection seatSelection = db.SeatSelections.Find(id);
            if (seatSelection == null)
            {
                return NotFound();
            }

            db.SeatSelections.Remove(seatSelection);
            db.SaveChanges();

            return Ok(seatSelection);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool SeatSelectionExists(string id)
        {
            return db.SeatSelections.Count(e => e.SeatNumber == id) > 0;
        }
    }
}