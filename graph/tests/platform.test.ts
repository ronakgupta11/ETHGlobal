import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { CourseCreated } from "../generated/schema"
import { CourseCreated as CourseCreatedEvent } from "../generated/Platform/Platform"
import { handleCourseCreated } from "../src/platform"
import { createCourseCreatedEvent } from "./platform-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let courseId = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let name = "Example string value"
    let description = "Example string value"
    let videoUrl = "Example string value"
    let imageUrl = "Example string value"
    let newCourseCreatedEvent = createCourseCreatedEvent(
      courseId,
      price,
      name,
      description,
      videoUrl,
      imageUrl
    )
    handleCourseCreated(newCourseCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("CourseCreated created and stored", () => {
    assert.entityCount("CourseCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "CourseCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "courseId",
      "234"
    )
    assert.fieldEquals(
      "CourseCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "CourseCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "name",
      "Example string value"
    )
    assert.fieldEquals(
      "CourseCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "CourseCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "videoUrl",
      "Example string value"
    )
    assert.fieldEquals(
      "CourseCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "imageUrl",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
