package com.codewild.nameper.resources;

import com.codewild.nameper.model.NameModel;
import com.mongodb.*;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.UnknownHostException;
import java.util.Random;

@Path("/nameResource")
@Produces({"application/json"})
public class NameResource {
    private static final String BOY = "boy";

    @GET
    @Path("/random/{gender}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getRandomName(@PathParam("gender") String gender) {
        NameModel name = new NameModel();
        MongoClient mongoClient = null;
        String genderLetter;
        BasicDBObject query;
        DBCursor cursor;

        try {
            if (gender.equals(BOY)) genderLetter = "M";
            else genderLetter = "F";

            mongoClient = new MongoClient("localhost");
            DB db = mongoClient.getDB("nameper");
            DBCollection coll = db.getCollection("names");

            if (!gender.equals("both")) {
                // Query for the gender we want
                query = new BasicDBObject("gender", genderLetter);
                cursor = coll.find(query);
            } else {
                cursor = coll.find();
            }
            // Convert the cursor to an array and generate a random number within the bounds of the result count
            // to index into the array. Could become and issue when the size of the results grows.
            Random rand = new Random();
            DBObject object = cursor.toArray().get(rand.nextInt(cursor.count()));
            name.setName((String) object.get("name"));
            name.setGender((String) object.get("gender"));
        } catch (UnknownHostException e) {
            e.printStackTrace();  //To change body of catch statement use File | Settings | File Templates.
        } finally {
            mongoClient.close();
        }
        return Response.ok().entity(name).build();
    }
}
