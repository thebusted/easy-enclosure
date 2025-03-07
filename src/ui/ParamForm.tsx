import React from "react";

import { useParams } from "../lib/params";

const NumberInput = ({label, value, min=1, onChange}: {label: string, value: number, min?: number, onChange: (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => void}) => (
  <div className="input-group">
    <label>{label}</label>
    <input type="number" min={min} value={value} onChange={onChange} />
  </div>
)

const CheckBox = ({label, value, onChange}: {label: string, value: boolean, onChange: (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>) => void}) => (
  <div className="input-group">
    <label>{label}</label>
    <input type="checkbox" checked={value} onChange={onChange} />
  </div>
)

export const ParamsForm = () => {
  const { length, width, height, floor, roof, wall, cornerRadius, wallMountScrewDiameter, 
    cableGlands, cableGlandSpecs, pcbMounts, pcbMountScrewDiameter, pcbMountXY, wallMounts, 
    waterProof, screws, screwDiameter, sealThickness, insertThickness, insertHeight  } = useParams()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement| HTMLSelectElement>, set: (v: number) => void) => {
    console.log(e.currentTarget.value)
    e.currentTarget.value && set(parseFloat(e.currentTarget.value))
  }

  return (
    <form id="param-form">
      <NumberInput label="Height" value={length.value} onChange={(e) => handleChange(e, length.set)} />
      <NumberInput label="Width" value={width.value} onChange={(e) => handleChange(e, width.set)} />
      <NumberInput label="Height" value={height.value} onChange={(e) => handleChange(e, height.set)} />
      <NumberInput label="Floor Thickness" value={floor.value} onChange={(e) => handleChange(e, floor.set)} />
      <NumberInput label="Wall Thickness" value={wall.value} onChange={(e) => handleChange(e, wall.set)} />
      <NumberInput label="Lid Thickness" value={roof.value} onChange={(e) => handleChange(e, roof.set)} />
      <NumberInput label="Insert Thickness" value={insertThickness.value} onChange={(e) => handleChange(e, insertThickness.set)} />
      <NumberInput label="Insert Height" value={insertHeight.value} onChange={(e) => handleChange(e, insertHeight.set)} />
      <NumberInput label="Corner Radius" value={cornerRadius.value} onChange={(e) => handleChange(e, cornerRadius.set)} />
      <hr />
      <NumberInput label="Holes" value={cableGlands.value} min={0} onChange={(e) => {
        const value = parseFloat(e.currentTarget.value)
        cableGlandSpecs.set(Array.from({ length: value }, () => [0, 12.5]))
        cableGlands.set(value)        
      }} />
      {cableGlands.value > 0 && 
        cableGlandSpecs.map((_, i) => (
          <div key={i}>
            <div className="input-group">
              <label>Hole {i+1} Wall</label>
              <select value={_[0].value} onChange={(e) => handleChange(e, _[0].set)}>
                <option value={0}>Front</option>
                <option value={1}>Right</option>
                <option value={2}>Back</option>
                <option value={3}>Left</option>
              </select>
            </div>          
            <NumberInput label={`Hole ${i+1} Diameter`} value={_[1].value} onChange={(e) => handleChange(e, _[1].set)} />
          </div>
        ))
      }
      <hr />
      <NumberInput label="PCB Mounts" value={pcbMounts.value} min={0} onChange={(e) => {
        const value = parseFloat(e.currentTarget.value)
        pcbMountXY.set(Array.from({ length: value }, () => [0, 0]))
        pcbMounts.set(value)
      }} />
      {
        pcbMounts.value > 0 &&
          <NumberInput label="Screw Diameter" value={pcbMountScrewDiameter.value} onChange={(e) => handleChange(e, pcbMountScrewDiameter.set)} />
      }

      {pcbMounts.value > 0 &&
        pcbMountXY.map((_, i) => (
          <div key={i}>
            <NumberInput label={`PCB Mount ${i + 1} X`} value={_[0].value} onChange={(e) => handleChange(e, _[0].set)} />
            <NumberInput label={`PCB Mount ${i + 1} Y`} value={_[1].value} onChange={(e) => handleChange(e, _[1].set)} />
          </div>
        ))
      }
      <hr />
      <div className="input-group">
        <label>Waterproof</label>
        <input type="checkbox" id="waterProof" checked={waterProof.value} onChange={(e) => {
          waterProof.set(e.currentTarget.checked)
          e.currentTarget.checked && screws.set(true)
        }} />
      </div>
      {
        waterProof.value &&
          <NumberInput label="Seal Thickness" value={sealThickness.value} onChange={(e) => handleChange(e, sealThickness.set)} />
      }
      <hr />
      <div className="input-group">
        <label>Lid Screws</label>
        <input type="checkbox" id="screws" checked={screws.value} onChange={(e) => {
          screws.set(e.currentTarget.checked)
          !e.currentTarget.checked && waterProof.set(false)
        }} />
      </div>
      {
        screws.value &&
          <NumberInput label="Screw Diameter" value={screwDiameter.value} onChange={(e) => handleChange(e, screwDiameter.set)} />
      }
      <hr />
      <div className="input-group">
        <label>Wall Mounts</label>
        <input type="checkbox" id="wallMounts" checked={wallMounts.value} onChange={(e) => wallMounts.set(e.currentTarget.checked)} />
      </div>
      {
        wallMounts.value &&
          <NumberInput label="Screw Diameter" value={wallMountScrewDiameter.value} onChange={(e) => handleChange(e, wallMountScrewDiameter.set)} />
      }
    </form>
  );
};