## OWSR Sim Racing Portal for Managed Events

This project is intended to be an online portal to allow users to sign up and participate seamlessly in managed and curated online simracing events

The project is still in development and is largely a proof of concept at the moment but a lot of the majot functionaliy is already in place

## Authentication

Authentication is done via Passport and next-session - User and session data is stored in a mongodb database

Email verification and reset password logic, as well as the discord authentications strategy are still WIP

The Use Demo Profile button on the auth modals automatically logs into to a fake demo account via credentials, but the regular sign-up sign in flow with email/password and steam is fully functional

## User Dashboard

The user dashboard was the primary focus of this project. The concept is to allow users to sign up and manage their events, get server info, view results, file protests etc.

## Event Search

There are a number of fake events already listed in the database to test the event search, dynamic details, and event registration functionality

Most data fetching on the dashboard is done with useSWR results cacheing, with the exception of the event search to more easily manage changing search filters and infinite loading

## API Routes

This project utilizes Next.js serverless architecture with built in api-routing
The api routes use custom session/authentication middleware to verify user and admin specific routes

The majority of crud operations are called from the /lib/db/dbFunctions file which utilizes a cached connection to the database and the Mongoose mongodb wrapper

## TODO LIST
