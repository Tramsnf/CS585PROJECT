create database if not exists studentportal;

use studentportal;


CREATE TABLE IF NOT EXISTS `user_profile` (
     `id` BIGINT NOT NULL AUTO_INCREMENT,
     `keycloak_id` VARCHAR(100) NOT NULL,
    `phone_number` VARCHAR(45) NULL,
    `email` VARCHAR(80) NULL,
    `username` VARCHAR(45) NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`));



CREATE TABLE IF NOT EXISTS `lecturer` (
     `id` BIGINT NOT NULL AUTO_INCREMENT,
     `registration_number` VARCHAR(60) NULL,
    `user_profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_lecturer_user_profile_idx` (`user_profile_id` ASC) VISIBLE,
    CONSTRAINT `fk_lecturer_user_profile`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



CREATE TABLE IF NOT EXISTS `student` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `registration_number` VARCHAR(60) NULL,
    `user_profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_student_user_profile1_idx` (`user_profile_id` ASC) VISIBLE,
    CONSTRAINT `fk_student_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE IF NOT EXISTS `space` (
      `id` BIGINT NOT NULL AUTO_INCREMENT,
      `title` VARCHAR(80) NULL,
    `type` VARCHAR(40) NULL,
    `time` DATETIME NULL,
    `description` VARCHAR(255) NULL,
    `lecturer_id` BIGINT NOT NULL,
    `student_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_meeting_lecturer1_idx` (`lecturer_id` ASC) VISIBLE,
    INDEX `fk_meeting_student1_idx` (`student_id` ASC) VISIBLE,
    CONSTRAINT `fk_meeting_lecturer10`
    FOREIGN KEY (`lecturer_id`)
    REFERENCES `lecturer` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_meeting_student10`
    FOREIGN KEY (`student_id`)
    REFERENCES `student` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



CREATE TABLE IF NOT EXISTS `message` (
    `id` BIGINT NOT NULL,
    `time_sent` DATETIME NULL,
    `time_read` DATETIME NULL,
    `message` VARCHAR(45) NULL,
    `notified` TINYINT NULL,
    `topics` VARCHAR(45) NULL,
    `space_id` BIGINT NOT NULL,
    `user_profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_message_space1_idx` (`space_id` ASC) VISIBLE,
    INDEX `fk_message_user_profile1_idx` (`user_profile_id` ASC) VISIBLE,
    CONSTRAINT `fk_message_space1`
    FOREIGN KEY (`space_id`)
    REFERENCES `space` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
    CONSTRAINT `fk_message_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



CREATE TABLE IF NOT EXISTS `meeting` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(80) NULL,
    `type` VARCHAR(40) NULL,
    `time` DATETIME NULL,
    `description` VARCHAR(255) NULL,
    `space_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_meeting_space1_idx` (`space_id` ASC) VISIBLE,
    CONSTRAINT `fk_meeting_space1`
    FOREIGN KEY (`space_id`)
    REFERENCES `space` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE IF NOT EXISTS `notification` (
     `id` BIGINT NOT NULL,
     `message` VARCHAR(45) NULL,
    `url` VARCHAR(85) NULL,
    `user_profile_id` BIGINT NOT NULL,
    `created_at` DATETIME NULL,
    `updated_at` DATETIME NULL,
    PRIMARY KEY (`id`),
    INDEX `fk_notification_user_profile1_idx` (`user_profile_id` ASC) VISIBLE,
    CONSTRAINT `fk_notification_user_profile1`
    FOREIGN KEY (`user_profile_id`)
    REFERENCES `user_profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

