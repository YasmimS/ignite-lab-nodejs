import { Injectable } from "@nestjs/common";
import { NotificationsRepository } from "../repositories/notifications-repository";
import { NotificationNotFound } from "./errors/notification-not-found";

interface UnreadNotificationRequest {
    notificationId: string,
}

type UnreadNoticationResponse  = void;

@Injectable()
export class UnreadNotification {

    constructor(private notificationRepository: NotificationsRepository){}

    async execute(request:UnreadNotificationRequest) : Promise<UnreadNoticationResponse>{
        const { notificationId} = request;

        const notification = await this.notificationRepository.findById(
            notificationId,
        );

        if (!notification) {
            throw new NotificationNotFound();
        }

        notification.unread();

        await this.notificationRepository.save(notification);

    }
}