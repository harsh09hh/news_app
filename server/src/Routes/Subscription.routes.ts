import { Router } from "express";

const subscriptionRouter =Router();




subscriptionRouter.get('/',(req,res)=>  res.send({title:'get all subscription'}) );

subscriptionRouter.get('/:id',(req,res)=>  res.send({title:'get subscription of a particular user'}) );

subscriptionRouter.put('/:id',(req,res)=>  res.send({title:'update  a subscription of a particular user'}));

subscriptionRouter.delete('/:id',(req,res)=>  res.send({title:'delete a subscription of  a particular user'}) );

subscriptionRouter.get('/',(req,res)=>  res.send({title:'get all subscription'}) );

subscriptionRouter.get('/',(req,res)=>  res.send({title:'get all subscription'}) );

subscriptionRouter.put('/:id/cancel',(req,res)=>  res.send({title:'cancel subscription of a particular user'}));

subscriptionRouter.get('/upcoming-renewals',(req,res)=>  res.send({title:'get all upcomming-renewals'}) );


export default subscriptionRouter;