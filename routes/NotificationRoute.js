const express = require('express');

const router = express.Router();

const NotificationController = require('../controllers/NotificationController');

const {authenticateUser , authorizeRoles} = require('../middleware/auth');


router.post('/createNotification',
    //  authenticateUser , authorizeRoles('admin'),
      NotificationController.createNotification);

router.get('/getNotifications',
    //  authenticateUser , authorizeRoles('admin'),
      NotificationController.getNotifications);

router.patch('/markAsRead/:id/read',
    //  authenticateUser , authorizeRoles('admin'),
      NotificationController.markAsRead);

router.delete('/deleteNotification/:id',
    //  authenticateUser , authorizeRoles('admin'),
      NotificationController.deleteNotification);

router.delete('/deleteAllNotifications',
    //  authenticateUser , authorizeRoles('admin'),
      NotificationController.deleteAllNotifications);



router.patch('/acceptNotification/:id',
    //  authenticateUser , authorizeRoles('admin'),
      NotificationController.acceptNotification);

router.patch('/declineNotification/:id',
    //  authenticateUser , authorizeRoles('admin'),
      NotificationController.declineNotification);


module.exports = router;