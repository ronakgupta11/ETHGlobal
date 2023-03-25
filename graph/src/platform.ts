import {
  CourseCreated as CourseCreatedEvent,
  CoursePurchase as CoursePurchaseEvent
} from "../generated/Platform/Platform"
import { CourseCreated, CoursePurchase } from "../generated/schema"

export function handleCourseCreated(event: CourseCreatedEvent): void {
  let entity = new CourseCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.courseId = event.params.courseId
  entity.price = event.params.price
  entity.name = event.params.name
  entity.description = event.params.description
  entity.videoUrl = event.params.videoUrl
  entity.imageUrl = event.params.imageUrl

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleCoursePurchase(event: CoursePurchaseEvent): void {
  let entity = new CoursePurchase(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.buyer = event.params.buyer
  entity.courseId = event.params.courseId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
