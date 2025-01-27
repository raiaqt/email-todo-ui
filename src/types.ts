import { JwtPayload } from "jwt-decode";

export interface JwtPayloadWithName extends JwtPayload {
  name: string;
}
