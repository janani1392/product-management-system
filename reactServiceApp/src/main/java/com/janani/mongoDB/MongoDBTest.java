package com.janani.mongoDB;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

public class MongoDBTest {
    public static void main(String[] args) {
        String uri = "mongodb+srv://janani:iCk7U9FzYghY8Yib@cluster0.s0wzc.mongodb.net/ReactServiceApp?retryWrites=true&w=majority";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            System.out.println("Connected to MongoDB!");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

