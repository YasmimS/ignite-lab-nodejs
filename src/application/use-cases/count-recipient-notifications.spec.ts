import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe('Count recipients Notifications', () => {
    it('should be able to count recipient notifications', async () => {
    
    const notificationRepository = new InMemoryNotificationsRepository()
    const countRecipientNotifications  = new CountRecipientNotifications(notificationRepository);

    await notificationRepository.create(
      makeNotification({recipientId: 'recipient-1'}),
    );  

    await notificationRepository.create(
      makeNotification({recipientId: 'recipient-1'}),
    ); 

    await notificationRepository.create(
      makeNotification({recipientId: 'recipient-2'}),
    ); 

     const { count } =  await countRecipientNotifications.execute({
      recipientId: 'recipient-1',
     });
     
     expect(count).toEqual(2);

   });

});