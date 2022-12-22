import { Content } from "@application/entities/content";
import { Notification } from "@application/entities/notification";
import { makeNotification } from "@test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository";
import { GetRecipientNotifications } from "./get-recipient-notifications";

describe('Get recipients Notifications', () => {
    it('should be able to get recipient notifications', async () => {
    
    const notificationRepository = new InMemoryNotificationsRepository()
    const getRecipientNotifications  = new GetRecipientNotifications(notificationRepository);

    await notificationRepository.create(
      makeNotification({recipientId: 'recipient-1'}),
    );  

    await notificationRepository.create(
      makeNotification({recipientId: 'recipient-1'}),
    ); 

    await notificationRepository.create(
      makeNotification({recipientId: 'recipient-2'}),
    ); 

     const { notifications } =  await getRecipientNotifications.execute({
      recipientId: 'recipient-1',
     });
     
     expect(notifications).toHaveLength(2);
     expect(notifications).toEqual([
        expect.objectContaining({ recipientId: 'recipient-1'}),
        expect.objectContaining({ recipientId: 'recipient-1'}),
    ])
  })
});