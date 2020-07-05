import * as yup from 'yup';
import { EntityType } from './enums';

// [schema objects](https://github.com/jquense/yup#extending-schema-types)
export const entitySchema = yup.object().shape({
  // sent inputs
  // TODO: Don't enable above validation, else we have error on input chaincode validation, not on save model
  // {"name":"Error","status":500,"message":"Error for field 'input' with val '{\"entity\":{\"id\":\"gov\",\"type\":\"com.chain.solidary.model.participant\",\"name\":\"Big Government\",\"msp\":\"org1MSP\",\"identities\":[{\"fingerprint\":\"80:B8:43:ED:00:3E:1E:C4:ED:F8:11:70:B9:2B:F1:02:0C:C3:8C:F5\",\"status\":true}]}}' id is a required field"}
  // id: yup
  //   .string().min(3)
  //   .required(),
  type: yup
    // seems that .mixed<type | type...>() syntax changed from...to .mixed()
    // .mixed<EntityType.Participant | EntityType.Person | EntityType.Cause>()
    .mixed()
    .oneOf([EntityType.Participant, EntityType.Person, EntityType.Cause]),
  // TODO: Don't enable above validation, else we have error on save model, because now we don't use type anymore
  // ValidationError: Error for field 'input' with val '{\"id\":\"gov\",\"type\":\"PARTICIPANT\"}'
  // entity: yup
  //   .mixed<FlatConvectorModel<Participant> | FlatConvectorModel<Person>/* | FlatConvectorModel<Cause>*/>()
  //   .required()
});
