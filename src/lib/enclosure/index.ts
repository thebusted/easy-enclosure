import { booleans, transforms } from '@jscad/modeling'
import { Geom3 } from '@jscad/modeling/src/geometries/types'

import { Params } from '../params'
import { Vec3 } from '@jscad/modeling/src/maths/vec3'

import { base } from './base'
import { lid } from './lid'
import { waterProofSeal } from './waterproofseal'

const { union } = booleans
const { translate } = transforms

const SPACING = 20

export const enclosure = (params: Params) => {
  const { length, width, height, wall } = params
    
  let entities: Geom3[] = []
  let result: Geom3[] = []

  if (params.showLid) {
    entities.push(translate([0,0,(wall/2)], lid(params)))
  }

  if (params.showBase) {
    entities.push(translate([0,0,(height/2)], base(params)))
  }

  if (params.waterProof) {
    entities.push(waterProofSeal(params))
  }

  let start

  if (entities.length === 1) {
    start = -(width/2)
  } else if (entities.length === 2) {
    start = SPACING/2
  } else {
    start = ((width/2)+SPACING)
  }

  for (let i = 0; i < entities.length; i++) {
    const pos = [start, -(length/2), 0] as Vec3
    result.push(translate(pos, entities[i]))
    start = start - (width+SPACING)
  }

  return union(result)
}