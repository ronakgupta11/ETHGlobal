import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import { CourseCreated, CoursePurchase } from "../generated/Platform/Platform"

export function createCourseCreatedEvent(
  courseId: BigInt,
  price: BigInt,
  name: string,
  description: string,
  videoUrl: string,
  imageUrl: string
): CourseCreated {
  let courseCreatedEvent = changetype<CourseCreated>(newMockEvent())

  courseCreatedEvent.parameters = new Array()

  courseCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "courseId",
      ethereum.Value.fromUnsignedBigInt(courseId)
    )
  )
  courseCreatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  courseCreatedEvent.parameters.push(
    new ethereum.EventParam("name", ethereum.Value.fromString(name))
  )
  courseCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  courseCreatedEvent.parameters.push(
    new ethereum.EventParam("videoUrl", ethereum.Value.fromString(videoUrl))
  )
  courseCreatedEvent.parameters.push(
    new ethereum.EventParam("imageUrl", ethereum.Value.fromString(imageUrl))
  )

  return courseCreatedEvent
}

export function createCoursePurchaseEvent(
  buyer: Address,
  courseId: BigInt
): CoursePurchase {
  let coursePurchaseEvent = changetype<CoursePurchase>(newMockEvent())

  coursePurchaseEvent.parameters = new Array()

  coursePurchaseEvent.parameters.push(
    new ethereum.EventParam("buyer", ethereum.Value.fromAddress(buyer))
  )
  coursePurchaseEvent.parameters.push(
    new ethereum.EventParam(
      "courseId",
      ethereum.Value.fromUnsignedBigInt(courseId)
    )
  )

  return coursePurchaseEvent
}
