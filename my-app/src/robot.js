import { DeviceController } from "@espruino-tools/core";

class RobotOdometry {
  constructor(initialX = 0, initialY = 0, initialTheta = 0, wheelbaseWidth) {
    this.x = initialX;
    this.y = initialY;
    this.theta = initialTheta; // in radians
    this.W = wheelbaseWidth;
  }

  update(deltaL, deltaR) {
    const deltaD = (deltaL + deltaR) / 2;
    const deltaTheta = (deltaR - deltaL) / this.W;

    this.x += deltaD * Math.cos(this.theta);
    this.y += deltaD * Math.sin(this.theta);
    this.theta += deltaTheta;

    // Normalize theta to [-pi, pi]
    while (this.theta > Math.PI) this.theta -= 2 * Math.PI;
    while (this.theta <= -Math.PI) this.theta += 2 * Math.PI;
  }

  getPosition() {
    return { x: this.x, y: this.y, theta: this.theta };
  }
}

export class Robot extends DeviceController {
  constructor(wheelRadius = 3.08) {
    super();
    this.speed = 1;
    this.wheelRadius = wheelRadius / 100; // Convert cm to meters
    this.totalRotations = 0; // Total wheel rotations made
  }
  setSpeed(speed) {
    this.speed = speed;
  }

  forward(rotations) {
    this.UART.write(`go(${rotations}, ${rotations}, 600)\n`);
    this.totalRotations += rotations; // Update the total rotations made
  }
  
  back(rotations) {
    this.UART.write(`go(-${rotations}, -${rotations}, 600)\n`);
    this.totalRotations -= rotations; // Update the total rotations made
  }

  turnAround(rotations) {
    this.UART.write(`go(-${rotations}, ${rotations}, 600)\n`);
    this.totalRotations += rotations; // Update the total rotations made
  }

  stop() {
    this.UART.write(`go(0, 0)\n`);
  }

  left(rotations) {
    this.UART.write(`go(${rotations}, 0, 500)\n`);
    this.totalRotations += rotations; // Update the total rotations made
  }

  slightleft(rotations) {
    this.UART.write(`go(${rotations / 2}, ${rotations / 4}, 600)\n`);
    this.totalRotations += rotations / 2; // Update the total rotations made
  }
  
  leftu(rotations) {
    this.UART.write(`go(${rotations / 2}, ${rotations / 4}, 600)\n`);
    this.totalRotations += rotations / 2; // Update the total rotations made
  }

  right(rotations) {
    this.UART.write(`go(0, ${rotations}, 500)\n`);
    this.totalRotations += rotations; // Update the total rotations made
  }

  slightright(rotations) {
    this.UART.write(`go(${rotations/2 }, ${rotations}, 600)\n`);
    this.totalRotations += rotations / 2; // Update the total rotations made
  }

  rightu(rotations) {
    this.UART.write(`go(${rotations / 4}, ${rotations / 2}, 600)\n`);
    this.totalRotations += rotations / 2; // Update the total rotations made
  }

  getDistanceTraveled() {
    return this.totalRotations * 2 * Math.PI * this.wheelRadius;
  }


}