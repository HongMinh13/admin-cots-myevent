import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: any; output: any; }
};

export enum Contract_Status {
  AdminCancel = 'AdminCancel',
  Cancel = 'Cancel',
  Completed = 'Completed',
  DepositPaid = 'DepositPaid',
  Draft = 'Draft',
  InProgress = 'InProgress',
  WaitingPaid = 'WaitingPaid'
}

export type ChangePasswordInput = {
  newPassword: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type CheckoutStripeResponse = {
  __typename?: 'CheckoutStripeResponse';
  cancelUrl: Scalars['String']['output'];
  checkoutUrl: Scalars['String']['output'];
  successUrl: Scalars['String']['output'];
};

export type CodeVerifyDto = {
  code: Scalars['String']['input'];
  email: Scalars['String']['input'];
};

export type ConfirmContractDeposit = {
  contractId: Scalars['ID']['input'];
  isApproved?: Scalars['Boolean']['input'];
};

export type ContractData = {
  __typename?: 'ContractData';
  createdAt: Scalars['DateTime']['output'];
  customer?: Maybe<CustomerData>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  rental: RentalData;
  singingDate?: Maybe<Scalars['DateTime']['output']>;
  status?: Maybe<Contract_Status>;
  updatedAt: Scalars['DateTime']['output'];
};

export type ContractsData = {
  __typename?: 'ContractsData';
  items: Array<ContractData>;
  meta: MetaPaginationInterface;
};

export type CreateContractDetailsRequest = {
  contractName: Scalars['String']['input'];
  customLocation?: InputMaybe<Scalars['String']['input']>;
  customerAddress: Scalars['String']['input'];
  customerName: Scalars['String']['input'];
  orgTime: OrgTimeRequest;
  phoneNumber: Scalars['String']['input'];
  selectedLocation?: InputMaybe<Scalars['String']['input']>;
  useCompanyLocation: Scalars['Boolean']['input'];
};

export type CreateDeviceRequest = {
  description: Scalars['String']['input'];
  hourlyRentalFee: Scalars['Float']['input'];
  img: Scalars['String']['input'];
  name: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateEventRequest = {
  description: Scalars['String']['input'];
  detail: Scalars['String']['input'];
  eventFormat?: InputMaybe<Scalars['Boolean']['input']>;
  eventTypeId: Scalars['ID']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  isTemplate?: InputMaybe<Scalars['Boolean']['input']>;
  name: Scalars['String']['input'];
  rentalId: Scalars['ID']['input'];
};

export type CreateEventTypeRequest = {
  name: Scalars['String']['input'];
};

export type CreateHumanResourcesRequest = {
  description: Scalars['String']['input'];
  hourlySalary: Scalars['Float']['input'];
  img: Scalars['String']['input'];
  name: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
};

export type CreateLocationRequest = {
  address: Scalars['String']['input'];
  description: Scalars['String']['input'];
  hourlyRentalFee: Scalars['Float']['input'];
  img: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type CreateServiceRentalRequest = {
  id: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
};

export type DepositContractDto = {
  cancelUrl: Scalars['String']['input'];
  contractId: Scalars['ID']['input'];
  successUrl: Scalars['String']['input'];
};

export type DeviceData = {
  __typename?: 'DeviceData';
  availableQuantity?: Maybe<Scalars['Float']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  hourlyRentalFee: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  img: Scalars['String']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
};

export type DeviceRentalData = {
  __typename?: 'DeviceRentalData';
  device: DeviceData;
  id: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
};

export type DevicesData = {
  __typename?: 'DevicesData';
  items: Array<DeviceData>;
  meta: MetaPaginationInterface;
};

export type EventData = {
  __typename?: 'EventData';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  detail: Scalars['String']['output'];
  eventFormat: Scalars['Boolean']['output'];
  eventType?: Maybe<EventTypeData>;
  id: Scalars['String']['output'];
  img?: Maybe<Scalars['String']['output']>;
  isTemplate: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  rental?: Maybe<RentalData>;
};

export type EventTypeData = {
  __typename?: 'EventTypeData';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type EventTypesData = {
  __typename?: 'EventTypesData';
  items: Array<EventTypeData>;
  meta: MetaPaginationInterface;
};

export type EventsData = {
  __typename?: 'EventsData';
  items: Array<EventData>;
  meta: MetaPaginationInterface;
};

export type CustomerData = {
  __typename?: 'CustomerData';
  address: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phoneNumber: Scalars['String']['output'];
};

export type GetEventsRequest = {
  eventTypeId?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Filter equal: filters:[{field: "User.name", operator: eq, data: "Cam"}]
   * - Filter not equal: filters:[{field: "User.name", operator: neq, data: "Cam"}]
   * - Filter less than: filters:[{field: "User.age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "User.age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "User.age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "User.age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "User.name", operator: in, data: "Cam,Camm"}]
   * - Filter field not in many choice: filters:[{field: "User.name", operator: nin, data: "Cam,camm"}]
   * - Filter field by text: filters:[{field: "User.name", operator: like, data: "Cam"}]
   */
  filters?: InputMaybe<Array<FilterDto>>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "User.createdAt:DESC"
   * - Use NULLS_FIRST OR NULLS_LAST to determine where null value should be, Ex: orderBy: "User.createdAt:DESC:NULLS_FIRST"
   *
   */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Scalars['Float']['input'];
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: InputMaybe<Scalars['String']['input']>;
};

export type FilterDto = {
  data?: InputMaybe<Scalars['String']['input']>;
  field: Scalars['String']['input'];
  operator: Query_Operator;
};

export type GetContractStatisticByMonth = {
  __typename?: 'GetContractStatisticByMonth';
  contract: Scalars['Float']['output'];
  month: Scalars['Float']['output'];
};

export type GetContractStatisticByYear = {
  __typename?: 'GetContractStatisticByYear';
  result: Array<GetContractStatisticByMonth>;
};

export type GetContractsRequest = {
  endTime?: InputMaybe<Scalars['DateTime']['input']>;
  /**
   *
   * - Filter equal: filters:[{field: "User.name", operator: eq, data: "Cam"}]
   * - Filter not equal: filters:[{field: "User.name", operator: neq, data: "Cam"}]
   * - Filter less than: filters:[{field: "User.age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "User.age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "User.age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "User.age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "User.name", operator: in, data: "Cam,Camm"}]
   * - Filter field not in many choice: filters:[{field: "User.name", operator: nin, data: "Cam,camm"}]
   * - Filter field by text: filters:[{field: "User.name", operator: like, data: "Cam"}]
   */
  filters?: InputMaybe<Array<FilterDto>>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: InputMaybe<Scalars['Float']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "User.createdAt:DESC"
   * - Use NULLS_FIRST OR NULLS_LAST to determine where null value should be, Ex: orderBy: "User.createdAt:DESC:NULLS_FIRST"
   *
   */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Scalars['Float']['input'];
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: InputMaybe<Scalars['String']['input']>;
  startTime?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<Contract_Status>;
};
export type GetServicesRequest = {
  endTime: Scalars['DateTime']['input'];
  /**
   *
   * - Filter equal: filters:[{field: "User.name", operator: eq, data: "Cam"}]
   * - Filter not equal: filters:[{field: "User.name", operator: neq, data: "Cam"}]
   * - Filter less than: filters:[{field: "User.age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "User.age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "User.age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "User.age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "User.name", operator: in, data: "Cam,Camm"}]
   * - Filter field not in many choice: filters:[{field: "User.name", operator: nin, data: "Cam,camm"}]
   * - Filter field by text: filters:[{field: "User.name", operator: like, data: "Cam"}]
   */
  filters?: InputMaybe<Array<FilterDto>>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "User.createdAt:DESC"
   * - Use NULLS_FIRST OR NULLS_LAST to determine where null value should be, Ex: orderBy: "User.createdAt:DESC:NULLS_FIRST"
   *
   */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Scalars['Float']['input'];
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: InputMaybe<Scalars['String']['input']>;
  startTime: Scalars['DateTime']['input'];
};

export type GetUserStatisticByMonth = {
  __typename?: 'GetUserStatisticByMonth';
  month: Scalars['Float']['output'];
  user: Scalars['Float']['output'];
};

export type GetUserStatisticByYear = {
  __typename?: 'GetUserStatisticByYear';
  result: Array<GetUserStatisticByMonth>;
};

export type GetUsersRequest = {
  /**
   *
   * - Filter equal: filters:[{field: "User.name", operator: eq, data: "Cam"}]
   * - Filter not equal: filters:[{field: "User.name", operator: neq, data: "Cam"}]
   * - Filter less than: filters:[{field: "User.age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "User.age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "User.age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "User.age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "User.name", operator: in, data: "Cam,Camm"}]
   * - Filter field not in many choice: filters:[{field: "User.name", operator: nin, data: "Cam,camm"}]
   * - Filter field by text: filters:[{field: "User.name", operator: like, data: "Cam"}]
   */
  filters?: InputMaybe<Array<FilterDto>>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "User.createdAt:DESC"
   * - Use NULLS_FIRST OR NULLS_LAST to determine where null value should be, Ex: orderBy: "User.createdAt:DESC:NULLS_FIRST"
   *
   */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Scalars['Float']['input'];
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<UserStatus>;
};

export type HumanResourceData = {
  __typename?: 'HumanResourceData';
  availableQuantity?: Maybe<Scalars['Float']['output']>;
  hourlySalary: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
};

export type HumanResourceRentalData = {
  __typename?: 'HumanResourceRentalData';
  humanResource: HumanResourceData;
  id: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
};

export type HumanResourcesData = {
  __typename?: 'HumanResourcesData';
  items: Array<HumanResourceData>;
  meta: MetaPaginationInterface;
};

export type IRole = {
  __typename?: 'IRole';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type IRoles = {
  __typename?: 'IRoles';
  items: Array<IRole>;
  meta: MetaPaginationInterface;
};

export type IUser = {
  __typename?: 'IUser';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<RoleData>;
  roleId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};

export type LocationData = {
  __typename?: 'LocationData';
  address: Scalars['String']['output'];
  hourlyRentalFee: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  img: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type LocationRentalData = {
  __typename?: 'LocationRentalData';
  id: Scalars['String']['output'];
  location: LocationData;
};

export type LocationsData = {
  __typename?: 'LocationsData';
  items: Array<LocationData>;
  meta: MetaPaginationInterface;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  refreshToken: Scalars['String']['output'];
  role: RoleData;
  token: Scalars['String']['output'];
};

export type MetaPaginationInterface = {
  __typename?: 'MetaPaginationInterface';
  currentPage: Scalars['Float']['output'];
  itemCount: Scalars['Float']['output'];
  itemsPerPage: Scalars['Float']['output'];
  totalItems: Scalars['Float']['output'];
  totalPages: Scalars['Float']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: ResponseMessageBase;
  confirmContractDeposit: ContractData;
  createDevice: ResponseMessageBase;
  createEvent: ResponseMessageBase;
  createEventTemplate: ResponseMessageBase;
  createEventType: ResponseMessageBase;
  createHumanResource: ResponseMessageBase;
  createLocation: ResponseMessageBase;
  deactivateUser: ResponseMessageBase;
  deleteDevice: ResponseMessageBase;
  deleteEventTemplate: ResponseMessageBase;
  refreshToken: RefreshResponse;
  rentalServices: ResponseMessageBase;
  signIn: LoginResponse;
  signOut: ResponseMessageBase;
  signUp: ResponseMessageBase;
  updateDevice: ResponseMessageBase;
  updateEventTemplate: ResponseMessageBase;
  updateStatusContract: ContractData;
  updateMe: IUser;
  uploadImage: Scalars['String']['output'];
  verifyCode: LoginResponse;
};


export type MutationChangePasswordArgs = {
  changePasswordInput: ChangePasswordInput;
};


export type MutationConfirmContractDepositArgs = {
  input: ConfirmContractDeposit;
};


export type MutationCreateDeviceArgs = {
  input: CreateDeviceRequest;
};


export type MutationCreateEventArgs = {
  input: CreateEventRequest;
};


export type MutationCreateEventTypeArgs = {
  input: CreateEventTypeRequest;
};


export type MutationCreateHumanResourceArgs = {
  input: CreateHumanResourcesRequest;
};


export type MutationCreateLocationArgs = {
  input: CreateLocationRequest;
};


export type MutationRefreshTokenArgs = {
  input: RefreshTokenDto;
};


export type MutationRentalServicesArgs = {
  input: RentalServicesRequest;
};


export type MutationSignInArgs = {
  input: SignInDto;
};


export type MutationSignOutArgs = {
  input: SignOutDto;
};


export type MutationSignUpArgs = {
  input: SignUpDto;
};


export type MutationUpdateMeArgs = {
  input: UserUpdateInput;
};


export type MutationUpdateStatusContractArgs = {
  input: UpdateContractStatusDto;
};


export type MutationUploadImageArgs = {
  input: UploadRequest;
};


export type MutationVerifyCodeArgs = {
  input: CodeVerifyDto;
};

export enum Query_Operator {
  Eq = 'eq',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  IsNotNull = 'isNotNull',
  IsNull = 'isNull',
  Like = 'like',
  Lt = 'lt',
  Lte = 'lte',
  Neq = 'neq',
  Nin = 'nin',
  UnaccentLike = 'unaccentLike'
}

export type Query = {
  __typename?: 'Query';
  getContracts: ContractsData;
  checkoutRemainBillingContract: CheckoutStripeResponse;
  depositContract: CheckoutStripeResponse;
  getContract: ContractData;
  getDeviceById: DeviceData;
  getDevices: DevicesData;
  getDevicesAvailable: DevicesData;
  getDevicesRental: Array<DeviceRentalData>;
  getEventById: EventData;
  getEventTypes: EventTypesData;
  getEvents: EventsData;
  getEventsTemplate: EventsData;
  getHumanResourcesAvailable: HumanResourcesData;
  getHumanResourcesRental: Array<HumanResourceRentalData>;
  getLocationsAvailable: LocationsData;
  getLocationsRental: Array<LocationRentalData>;
  getMe: IUser;
  getMyContracts: ContractsData;
  getRole: IRole;
  getRoles: IRoles;
  testQuery: Scalars['String']['output'];
};


export type QueryCheckoutRemainBillingContractArgs = {
  input: DepositContractDto;
};


export type QueryDepositContractArgs = {
  input: DepositContractDto;
};


export type QueryGetContractArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetContractsArgs = {
  queryParams: GetContractsRequest;
};


export type QueryGetDevicesAvailableArgs = {
  input: GetServicesRequest;
};


export type QueryGetDevicesRentalArgs = {
  rentalId: Scalars['String']['input'];
};


export type QueryGetEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetEventTypesArgs = {
  input: QueryFilterDto;
};


export type QueryGetEventsArgs = {
  input: QueryFilterDto;
};


export type QueryGetHumanResourcesAvailableArgs = {
  input: GetServicesRequest;
};


export type QueryGetHumanResourcesRentalArgs = {
  rentalId: Scalars['String']['input'];
};


export type QueryGetLocationsAvailableArgs = {
  input: GetServicesRequest;
};


export type QueryGetLocationsRentalArgs = {
  rentalId: Scalars['String']['input'];
};


export type QueryGetMyContractsArgs = {
  queryParams: GetContractsRequest;
};


export type QueryGetRoleArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetRolesArgs = {
  queryParams: QueryFilterDto;
};

export type QueryFilterDto = {
  /**
   *
   * - Filter equal: filters:[{field: "User.name", operator: eq, data: "Cam"}]
   * - Filter not equal: filters:[{field: "User.name", operator: neq, data: "Cam"}]
   * - Filter less than: filters:[{field: "User.age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "User.age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "User.age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "User.age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "User.name", operator: in, data: "Cam,Camm"}]
   * - Filter field not in many choice: filters:[{field: "User.name", operator: nin, data: "Cam,camm"}]
   * - Filter field by text: filters:[{field: "User.name", operator: like, data: "Cam"}]
   */
  filters?: InputMaybe<Array<FilterDto>>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "User.createdAt:DESC"
   * - Use NULLS_FIRST OR NULLS_LAST to determine where null value should be, Ex: orderBy: "User.createdAt:DESC:NULLS_FIRST"
   *
   */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Scalars['Float']['input'];
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: InputMaybe<Scalars['String']['input']>;
};

export type RefreshResponse = {
  __typename?: 'RefreshResponse';
  accessToken: Scalars['String']['output'];
};

export type RefreshTokenDto = {
  refreshToken: Scalars['String']['input'];
};

export type TimelineData = {
  __typename?: 'TimelineData';
  description: Scalars['String']['output'];
  id: Scalars['String']['output'];
  startTime: Scalars['DateTime']['output'];
};

export type RentalData = {
  __typename?: 'RentalData';
  customLocation?: Maybe<Scalars['String']['output']>;
  devices?: Maybe<Array<DeviceData>>;
  event?: Maybe<EventData>;
  humanResources?: Maybe<Array<HumanResourceData>>;
  id: Scalars['String']['output'];
  locations?: Maybe<Array<LocationData>>;
  rentalEndTime?: Maybe<Scalars['DateTime']['output']>;
  rentalStartTime?: Maybe<Scalars['DateTime']['output']>;
  timelines?: Maybe<Array<TimelineData>>;
  totalPrice: Scalars['Float']['output'];
  user: UserData;
};

export type RentalServicesRequest = {
  contractDetails: CreateContractDetailsRequest;
  devices?: InputMaybe<Array<CreateServiceRentalRequest>>;
  employees?: InputMaybe<Array<CreateServiceRentalRequest>>;
};

export type ResponseMessageBase = {
  __typename?: 'ResponseMessageBase';
  message: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type RoleData = {
  __typename?: 'RoleData';
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type SignInDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type SignOutDto = {
  refreshToken: Scalars['String']['input'];
};

export type SignUpDto = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type UpdateContractStatusDto = {
  contractId: Scalars['ID']['input'];
  status: Contract_Status;
};

export type UploadRequest = {
  file: Scalars['String']['input'];
  folder: Scalars['String']['input'];
};

export type UserData = {
  __typename?: 'UserData';
  avatar?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTime']['output']>;
  dob?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  gender?: Maybe<Scalars['Boolean']['output']>;
  id: Scalars['ID']['output'];
  lastName: Scalars['String']['output'];
  phoneNumber?: Maybe<Scalars['String']['output']>;
  role?: Maybe<RoleData>;
  roleId: Scalars['ID']['output'];
  status?: Maybe<UserStatus>;
  updatedAt?: Maybe<Scalars['DateTime']['output']>;
};



export type UserUpdateInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  firstName?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  phoneNumber?: InputMaybe<Scalars['String']['input']>;
};

export type OrgTimeRequest = {
  endTime: Scalars['DateTime']['input'];
  startTime: Scalars['DateTime']['input'];
};

export type MetaFragmentFragment = { __typename?: 'MetaPaginationInterface', totalItems: number, itemCount: number, itemsPerPage: number, totalPages: number, currentPage: number };

export type ChangePasswordMutationVariables = Exact<{
  changePasswordInput: ChangePasswordInput;
}>;


export type ChangePasswordMutation = { __typename?: 'Mutation', changePassword: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type CreateDeviceMutationVariables = Exact<{
  input: CreateDeviceRequest;
}>;


export type CreateDeviceMutation = { __typename?: 'Mutation', createDevice: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type CreateEventTypeMutationVariables = Exact<{
  input: CreateEventTypeRequest;
}>;


export type CreateEventTypeMutation = { __typename?: 'Mutation', createEventType: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type CreateHumanResourceMutationVariables = Exact<{
  input: CreateHumanResourcesRequest;
}>;


export type CreateHumanResourceMutation = { __typename?: 'Mutation', createHumanResource: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type CreateLocationMutationVariables = Exact<{
  input: CreateLocationRequest;
}>;


export type CreateLocationMutation = { __typename?: 'Mutation', createLocation: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type RefreshTokenMutationVariables = Exact<{
  input: RefreshTokenDto;
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshResponse', accessToken: string } };

export type RentalServicesMutationVariables = Exact<{
  input: RentalServicesRequest;
}>;


export type RentalServicesMutation = { __typename?: 'Mutation', rentalServices: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type SignInMutationVariables = Exact<{
  input: SignInDto;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'LoginResponse', token: string, refreshToken: string, id: string, email: string, role: { __typename?: 'RoleData', id: string, name: string } } };

export type SignUpMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type UpdateMeMutationVariables = Exact<{
  input: UserUpdateInput;
}>;


export type UpdateMeMutation = { __typename?: 'Mutation', updateMe: { __typename?: 'IUser', avatar?: string | null, email: string, firstName: string, lastName: string, id: string, phoneNumber?: string | null, role?: { __typename?: 'RoleData', name: string } | null } };

export type UpdateStatusContractMutationVariables = Exact<{
  input: UpdateContractStatusDto;
}>;


export type UpdateStatusContractMutation = { __typename?: 'Mutation', updateStatusContract: { __typename?: 'ContractData', createdAt: any, id: string, name: string, singingDate?: any | null, rental: { __typename?: 'RentalData', id: string, rentalEndTime?: any | null, rentalStartTime?: any | null, totalPrice: number, devices?: Array<{ __typename?: 'DeviceData', availableQuantity?: number | null, description: string, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number }> | null, humanResources?: Array<{ __typename?: 'HumanResourceData', availableQuantity?: number | null, description: string, hourlySalary: number, id: string, name: string, quantity: number }> | null, locations?: Array<{ __typename?: 'LocationData', address: string, description: string, hourlyRentalFee: number, id: string, img: string, name: string }> | null, user: { __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } } } };

export type UploadImageMutationVariables = Exact<{
  input: UploadRequest;
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: string };

export type VerifyCodeMutationVariables = Exact<{
  input: CodeVerifyDto;
}>;


export type VerifyCodeMutation = { __typename?: 'Mutation', verifyCode: { __typename?: 'LoginResponse', token: string, refreshToken: string, id: string } };

export type GetContractQueryVariables = Exact<{
  getContractId: Scalars['String']['input'];
}>;


export type GetContractQuery = { __typename?: 'Query', getContract: { __typename?: 'ContractData', createdAt: any, id: string, name: string, singingDate?: any | null, status?: Contract_Status | null, updatedAt: any, customer?: { __typename?: 'CustomerData', address: string, id: string, name: string, phoneNumber: string } | null, rental: { __typename?: 'RentalData', customLocation?: string | null, id: string, rentalEndTime?: any | null, rentalStartTime?: any | null, totalPrice: number, devices?: Array<{ __typename?: 'DeviceData', availableQuantity?: number | null, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number }> | null, event?: { __typename?: 'EventData', createdAt: any, description: string, detail: string, eventFormat: boolean, id: string, img?: string | null, isTemplate: boolean, name: string, eventType?: { __typename?: 'EventTypeData', id: string, name: string } | null } | null, humanResources?: Array<{ __typename?: 'HumanResourceData', availableQuantity?: number | null, createdAt: any, description: string, hourlySalary: number, id: string, img?: string | null, name: string, quantity: number }> | null, locations?: Array<{ __typename?: 'LocationData', address: string, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string }> | null, user: { __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } } } };

export type GetContractStatisticByYearQueryVariables = Exact<{
  year: Scalars['Float']['input'];
}>;


export type GetContractStatisticByYearQuery = { __typename?: 'Query', getContractStatisticByYear: { __typename?: 'GetContractStatisticByYear', result: Array<{ __typename?: 'GetContractStatisticByMonth', contract: number, month: number }> } };

export type GetContractsQueryVariables = Exact<{
  queryParams: GetContractsRequest;
}>;


export type GetContractsQuery = { __typename?: 'Query', getContracts: { __typename?: 'ContractsData', items: Array<{ __typename?: 'ContractData', createdAt: any, id: string, name: string, singingDate?: any | null, status?: Contract_Status | null, updatedAt: any, customer?: { __typename?: 'CustomerData', address: string, id: string, name: string, phoneNumber: string } | null, rental: { __typename?: 'RentalData', customLocation?: string | null, id: string, rentalEndTime?: any | null, rentalStartTime?: any | null, totalPrice: number, devices?: Array<{ __typename?: 'DeviceData', availableQuantity?: number | null, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number }> | null, event?: { __typename?: 'EventData', createdAt: any, description: string, detail: string, eventFormat: boolean, id: string, img?: string | null, isTemplate: boolean, name: string, eventType?: { __typename?: 'EventTypeData', id: string, name: string } | null } | null, humanResources?: Array<{ __typename?: 'HumanResourceData', availableQuantity?: number | null, createdAt: any, description: string, hourlySalary: number, id: string, img?: string | null, name: string, quantity: number }> | null, locations?: Array<{ __typename?: 'LocationData', address: string, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string }> | null, user: { __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } } }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };


export type GetDevicesAvailableQueryVariables = Exact<{
  input: GetServicesRequest;
}>;


export type GetDevicesAvailableQuery = { __typename?: 'Query', getDevicesAvailable: { __typename?: 'DevicesData', items: Array<{ __typename?: 'DeviceData', availableQuantity?: number | null, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };

export type GetDevicesRentalQueryVariables = Exact<{
  rentalId: Scalars['String']['input'];
}>;


export type GetDevicesRentalQuery = { __typename?: 'Query', getDevicesRental: Array<{ __typename?: 'DeviceRentalData', id: string, quantity: number, device: { __typename?: 'DeviceData', availableQuantity?: number | null, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number } }> };

export type GetEventByIdQueryVariables = Exact<{
  getEventByIdId: Scalars['String']['input'];
}>;


export type GetEventByIdQuery = { __typename?: 'Query', getEventById: { __typename?: 'EventData', createdAt: any, description: string, eventFormat: boolean, id: string, img?: string | null, isTemplate: boolean, name: string, eventType?: { __typename?: 'EventTypeData', id: string, name: string } | null, rental?: { __typename?: 'RentalData', id: string, rentalEndTime: any, rentalStartTime: any, totalPrice: number, user: { __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } } | null } };

export type GetEventTypesQueryVariables = Exact<{
  input: QueryFilterDto;
}>;

export type GetEventsQuery = { __typename?: 'Query', getEvents: { __typename?: 'EventsData', items: Array<{ __typename?: 'EventData', createdAt: any, description: string, eventFormat: boolean, id: string, img?: string | null, isTemplate: boolean, name: string, eventType?: { __typename?: 'EventTypeData', id: string, name: string } | null, rental?: { __typename?: 'RentalData', id: string, rentalEndTime: any, rentalStartTime: any, totalPrice: number, user: { __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } } | null }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };

export type GetHumanResourcesAvailableQueryVariables = Exact<{
  input: GetServicesRequest;
}>;


export type GetHumanResourcesAvailableQuery = { __typename?: 'Query', getHumanResourcesAvailable: { __typename?: 'HumanResourcesData', items: Array<{ __typename?: 'HumanResourceData', availableQuantity?: number | null, hourlySalary: number, id: string, name: string, quantity: number }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };

export type GetHumanResourcesRentalQueryVariables = Exact<{
  rentalId: Scalars['String']['input'];
}>;


export type GetHumanResourcesRentalQuery = { __typename?: 'Query', getHumanResourcesRental: Array<{ __typename?: 'HumanResourceRentalData', id: string, quantity: number, humanResource: { __typename?: 'HumanResourceData', availableQuantity?: number | null, hourlySalary: number, id: string, name: string, quantity: number } }> };

export type GetLocationsAvailableQueryVariables = Exact<{
  input: GetServicesRequest;
}>;


export type GetLocationsAvailableQuery = { __typename?: 'Query', getLocationsAvailable: { __typename?: 'LocationsData', items: Array<{ __typename?: 'LocationData', address: string, id: string, img: string, name: string, hourlyRentalFee: number }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };

export type GetLocationsRentalQueryVariables = Exact<{
  rentalId: Scalars['String']['input'];
}>;


export type GetLocationsRentalQuery = { __typename?: 'Query', getLocationsRental: Array<{ __typename?: 'LocationRentalData', id: string, location: { __typename?: 'LocationData', address: string, id: string, img: string, name: string } }> };

export type GetMeQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMeQuery = { __typename?: 'Query', getMe: { __typename?: 'IUser', avatar?: string | null, createdAt?: any | null, email: string, firstName: string, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } };

export type GetRevenueStatisticByYearQueryVariables = Exact<{
  year: Scalars['Float']['input'];
}>;


export type GetRevenueStatisticByYearQuery = { __typename?: 'Query', getRevenueStatisticByYear: { __typename?: 'GetRevenueStatisticByYear', result: Array<{ __typename?: 'GetRevenueStatisticByMonth', month: number, revenue: number }> } };

export type GetRoleQueryVariables = Exact<{
  getRoleId: Scalars['ID']['input'];
}>;


export type GetRoleQuery = { __typename?: 'Query', getRole: { __typename?: 'IRole', id: string, name: string } };

export type GetRolesQueryVariables = Exact<{
  queryParams: QueryFilterDto;
}>;


export type GetRolesQuery = { __typename?: 'Query', getRoles: { __typename?: 'IRoles', items: Array<{ __typename?: 'IRole', id: string, name: string }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };

export type GetUserStatisticByYearQueryVariables = Exact<{
  year: Scalars['Float']['input'];
}>;


export type GetUserStatisticByYearQuery = { __typename?: 'Query', getUserStatisticByYear: { __typename?: 'GetUserStatisticByYear', result: Array<{ __typename?: 'GetUserStatisticByMonth', month: number, user: number }> } };

export type GetUsersQueryVariables = Exact<{
  queryParams: GetUsersRequest;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers: { __typename?: 'UsersData', items: Array<{ __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, status?: UserStatus | null, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };


export const MetaFragmentFragmentDoc = gql`
    fragment MetaFragment on MetaPaginationInterface {
  totalItems
  itemCount
  itemsPerPage
  totalPages
  currentPage
}
    `;
export const ChangePasswordDocument = gql`
    mutation changePassword($changePasswordInput: ChangePasswordInput!) {
  changePassword(changePasswordInput: $changePasswordInput) {
    message
    success
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      changePasswordInput: // value for 'changePasswordInput'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, options);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const CreateDeviceDocument = gql`
    mutation CreateDevice($input: CreateDeviceRequest!) {
  createDevice(input: $input) {
    message
    success
  }
}
    `;
export type CreateDeviceMutationFn = Apollo.MutationFunction<CreateDeviceMutation, CreateDeviceMutationVariables>;

/**
 * __useCreateDeviceMutation__
 *
 * To run a mutation, you first call `useCreateDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDeviceMutation, { data, loading, error }] = useCreateDeviceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateDeviceMutation, CreateDeviceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateDeviceMutation, CreateDeviceMutationVariables>(CreateDeviceDocument, options);
      }
export type CreateDeviceMutationHookResult = ReturnType<typeof useCreateDeviceMutation>;
export type CreateDeviceMutationResult = Apollo.MutationResult<CreateDeviceMutation>;
export type CreateDeviceMutationOptions = Apollo.BaseMutationOptions<CreateDeviceMutation, CreateDeviceMutationVariables>;
export const CreateEventTypeDocument = gql`
    mutation CreateEventType($input: CreateEventTypeRequest!) {
  createEventType(input: $input) {
    message
    success
  }
}
    `;
export type CreateEventTypeMutationFn = Apollo.MutationFunction<CreateEventTypeMutation, CreateEventTypeMutationVariables>;

/**
 * __useCreateEventTypeMutation__
 *
 * To run a mutation, you first call `useCreateEventTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventTypeMutation, { data, loading, error }] = useCreateEventTypeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventTypeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEventTypeMutation, CreateEventTypeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateEventTypeMutation, CreateEventTypeMutationVariables>(CreateEventTypeDocument, options);
      }
export type CreateEventTypeMutationHookResult = ReturnType<typeof useCreateEventTypeMutation>;
export type CreateEventTypeMutationResult = Apollo.MutationResult<CreateEventTypeMutation>;
export type CreateEventTypeMutationOptions = Apollo.BaseMutationOptions<CreateEventTypeMutation, CreateEventTypeMutationVariables>;
export const CreateHumanResourceDocument = gql`
    mutation CreateHumanResource($input: CreateHumanResourcesRequest!) {
  createHumanResource(input: $input) {
    message
    success
  }
}
    `;
export type CreateHumanResourceMutationFn = Apollo.MutationFunction<CreateHumanResourceMutation, CreateHumanResourceMutationVariables>;

/**
 * __useCreateHumanResourceMutation__
 *
 * To run a mutation, you first call `useCreateHumanResourceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHumanResourceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHumanResourceMutation, { data, loading, error }] = useCreateHumanResourceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateHumanResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateHumanResourceMutation, CreateHumanResourceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateHumanResourceMutation, CreateHumanResourceMutationVariables>(CreateHumanResourceDocument, options);
      }
export type CreateHumanResourceMutationHookResult = ReturnType<typeof useCreateHumanResourceMutation>;
export type CreateHumanResourceMutationResult = Apollo.MutationResult<CreateHumanResourceMutation>;
export type CreateHumanResourceMutationOptions = Apollo.BaseMutationOptions<CreateHumanResourceMutation, CreateHumanResourceMutationVariables>;
export const CreateLocationDocument = gql`
    mutation CreateLocation($input: CreateLocationRequest!) {
  createLocation(input: $input) {
    message
    success
  }
}
    `;
export type CreateLocationMutationFn = Apollo.MutationFunction<CreateLocationMutation, CreateLocationMutationVariables>;

/**
 * __useCreateLocationMutation__
 *
 * To run a mutation, you first call `useCreateLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createLocationMutation, { data, loading, error }] = useCreateLocationMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateLocationMutation, CreateLocationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateLocationMutation, CreateLocationMutationVariables>(CreateLocationDocument, options);
      }
export type CreateLocationMutationHookResult = ReturnType<typeof useCreateLocationMutation>;
export type CreateLocationMutationResult = Apollo.MutationResult<CreateLocationMutation>;
export type CreateLocationMutationOptions = Apollo.BaseMutationOptions<CreateLocationMutation, CreateLocationMutationVariables>;
export const RefreshTokenDocument = gql`
    mutation refreshToken($input: RefreshTokenDto!) {
  refreshToken(input: $input) {
    accessToken
  }
}
    `;
export type RefreshTokenMutationFn = Apollo.MutationFunction<RefreshTokenMutation, RefreshTokenMutationVariables>;

/**
 * __useRefreshTokenMutation__
 *
 * To run a mutation, you first call `useRefreshTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshTokenMutation, { data, loading, error }] = useRefreshTokenMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRefreshTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RefreshTokenMutation, RefreshTokenMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RefreshTokenMutation, RefreshTokenMutationVariables>(RefreshTokenDocument, options);
      }
export type RefreshTokenMutationHookResult = ReturnType<typeof useRefreshTokenMutation>;
export type RefreshTokenMutationResult = Apollo.MutationResult<RefreshTokenMutation>;
export type RefreshTokenMutationOptions = Apollo.BaseMutationOptions<RefreshTokenMutation, RefreshTokenMutationVariables>;
export const RentalServicesDocument = gql`
    mutation RentalServices($input: RentalServicesRequest!) {
  rentalServices(input: $input) {
    message
    success
  }
}
    `;
export type RentalServicesMutationFn = Apollo.MutationFunction<RentalServicesMutation, RentalServicesMutationVariables>;

/**
 * __useRentalServicesMutation__
 *
 * To run a mutation, you first call `useRentalServicesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRentalServicesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rentalServicesMutation, { data, loading, error }] = useRentalServicesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRentalServicesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RentalServicesMutation, RentalServicesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RentalServicesMutation, RentalServicesMutationVariables>(RentalServicesDocument, options);
      }
export type RentalServicesMutationHookResult = ReturnType<typeof useRentalServicesMutation>;
export type RentalServicesMutationResult = Apollo.MutationResult<RentalServicesMutation>;
export type RentalServicesMutationOptions = Apollo.BaseMutationOptions<RentalServicesMutation, RentalServicesMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($input: SignInDto!) {
  signIn(input: $input) {
    token
    refreshToken
    id
    email
    role {
      id
      name
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($input: SignUpDto!) {
  signUp(input: $input) {
    message
    success
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateMeDocument = gql`
    mutation updateMe($input: UserUpdateInput!) {
  updateMe(input: $input) {
    avatar
    email
    firstName
    lastName
    id
    phoneNumber
    role {
      name
    }
  }
}
    `;
export type UpdateMeMutationFn = Apollo.MutationFunction<UpdateMeMutation, UpdateMeMutationVariables>;

/**
 * __useUpdateMeMutation__
 *
 * To run a mutation, you first call `useUpdateMeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateMeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateMeMutation, { data, loading, error }] = useUpdateMeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateMeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateMeMutation, UpdateMeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateMeMutation, UpdateMeMutationVariables>(UpdateMeDocument, options);
      }
export type UpdateMeMutationHookResult = ReturnType<typeof useUpdateMeMutation>;
export type UpdateMeMutationResult = Apollo.MutationResult<UpdateMeMutation>;
export type UpdateMeMutationOptions = Apollo.BaseMutationOptions<UpdateMeMutation, UpdateMeMutationVariables>;
export const UploadImageDocument = gql`
    mutation UploadImage($input: UploadRequest!) {
  uploadImage(input: $input)
}
    `;
export type UploadImageMutationFn = Apollo.MutationFunction<UploadImageMutation, UploadImageMutationVariables>;

/**
 * __useUploadImageMutation__
 *
 * To run a mutation, you first call `useUploadImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadImageMutation, { data, loading, error }] = useUploadImageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUploadImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadImageMutation, UploadImageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument, options);
      }
export type UploadImageMutationHookResult = ReturnType<typeof useUploadImageMutation>;
export type UploadImageMutationResult = Apollo.MutationResult<UploadImageMutation>;
export type UploadImageMutationOptions = Apollo.BaseMutationOptions<UploadImageMutation, UploadImageMutationVariables>;
export const VerifyCodeDocument = gql`
    mutation verifyCode($input: CodeVerifyDto!) {
  verifyCode(input: $input) {
    token
    refreshToken
    id
  }
}
    `;
export type VerifyCodeMutationFn = Apollo.MutationFunction<VerifyCodeMutation, VerifyCodeMutationVariables>;

/**
 * __useVerifyCodeMutation__
 *
 * To run a mutation, you first call `useVerifyCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyCodeMutation, { data, loading, error }] = useVerifyCodeMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useVerifyCodeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VerifyCodeMutation, VerifyCodeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<VerifyCodeMutation, VerifyCodeMutationVariables>(VerifyCodeDocument, options);
      }
export type VerifyCodeMutationHookResult = ReturnType<typeof useVerifyCodeMutation>;
export type VerifyCodeMutationResult = Apollo.MutationResult<VerifyCodeMutation>;
export type VerifyCodeMutationOptions = Apollo.BaseMutationOptions<VerifyCodeMutation, VerifyCodeMutationVariables>;
export const GetDevicesAvailableDocument = gql`
    query GetDevicesAvailable($input: GetServicesRequest!) {
  getDevicesAvailable(input: $input) {
    items {
      availableQuantity
      hourlyRentalFee
      id
      img
      name
      quantity
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;
    
export const GetContractStatisticByYearDocument = gql`
  query GetContractStatisticByYear($year: Float!) {
getContractStatisticByYear(year: $year) {
  result {
    contract
    month
  }
}
}
  `;

/**
* __useGetContractStatisticByYearQuery__
*
* To run a query within a React component, call `useGetContractStatisticByYearQuery` and pass it any options that fit your needs.
* When your component renders, `useGetContractStatisticByYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
* you can use to render your UI.
*
* @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
*
* @example
* const { data, loading, error } = useGetContractStatisticByYearQuery({
*   variables: {
*      year: // value for 'year'
*   },
* });
*/

export function useGetContractStatisticByYearQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetContractStatisticByYearQuery, GetContractStatisticByYearQueryVariables> & ({ variables: GetContractStatisticByYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
      const options = {...defaultOptions, ...baseOptions}
      return ApolloReactHooks.useQuery<GetContractStatisticByYearQuery, GetContractStatisticByYearQueryVariables>(GetContractStatisticByYearDocument, options);
    }
export function useGetContractStatisticByYearLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetContractStatisticByYearQuery, GetContractStatisticByYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useLazyQuery<GetContractStatisticByYearQuery, GetContractStatisticByYearQueryVariables>(GetContractStatisticByYearDocument, options);
      }
export function useGetContractStatisticByYearSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetContractStatisticByYearQuery, GetContractStatisticByYearQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSuspenseQuery<GetContractStatisticByYearQuery, GetContractStatisticByYearQueryVariables>(GetContractStatisticByYearDocument, options);
      }
export type GetContractStatisticByYearQueryHookResult = ReturnType<typeof useGetContractStatisticByYearQuery>;
export type GetContractStatisticByYearLazyQueryHookResult = ReturnType<typeof useGetContractStatisticByYearLazyQuery>;
export type GetContractStatisticByYearSuspenseQueryHookResult = ReturnType<typeof useGetContractStatisticByYearSuspenseQuery>;
export type GetContractStatisticByYearQueryResult = Apollo.QueryResult<GetContractStatisticByYearQuery, GetContractStatisticByYearQueryVariables>;

/**
 * __useGetDevicesAvailableQuery__
 *
 * To run a query within a React component, call `useGetDevicesAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDevicesAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDevicesAvailableQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetDevicesAvailableQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetDevicesAvailableQuery, GetDevicesAvailableQueryVariables> & ({ variables: GetDevicesAvailableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDevicesAvailableQuery, GetDevicesAvailableQueryVariables>(GetDevicesAvailableDocument, options);
      }
export function useGetDevicesAvailableLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDevicesAvailableQuery, GetDevicesAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDevicesAvailableQuery, GetDevicesAvailableQueryVariables>(GetDevicesAvailableDocument, options);
        }
export function useGetDevicesAvailableSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetDevicesAvailableQuery, GetDevicesAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetDevicesAvailableQuery, GetDevicesAvailableQueryVariables>(GetDevicesAvailableDocument, options);
        }
export type GetDevicesAvailableQueryHookResult = ReturnType<typeof useGetDevicesAvailableQuery>;
export type GetDevicesAvailableLazyQueryHookResult = ReturnType<typeof useGetDevicesAvailableLazyQuery>;
export type GetDevicesAvailableSuspenseQueryHookResult = ReturnType<typeof useGetDevicesAvailableSuspenseQuery>;
export type GetDevicesAvailableQueryResult = Apollo.QueryResult<GetDevicesAvailableQuery, GetDevicesAvailableQueryVariables>;
export const GetDevicesRentalDocument = gql`
    query GetDevicesRental($rentalId: String!) {
  getDevicesRental(rentalId: $rentalId) {
    device {
      availableQuantity
      hourlyRentalFee
      id
      img
      name
      quantity
    }
    id
    quantity
  }
}
    `;

/**
 * __useGetDevicesRentalQuery__
 *
 * To run a query within a React component, call `useGetDevicesRentalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDevicesRentalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDevicesRentalQuery({
 *   variables: {
 *      rentalId: // value for 'rentalId'
 *   },
 * });
 */
export function useGetDevicesRentalQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetDevicesRentalQuery, GetDevicesRentalQueryVariables> & ({ variables: GetDevicesRentalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetDevicesRentalQuery, GetDevicesRentalQueryVariables>(GetDevicesRentalDocument, options);
      }
export function useGetDevicesRentalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDevicesRentalQuery, GetDevicesRentalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetDevicesRentalQuery, GetDevicesRentalQueryVariables>(GetDevicesRentalDocument, options);
        }
export function useGetDevicesRentalSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetDevicesRentalQuery, GetDevicesRentalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetDevicesRentalQuery, GetDevicesRentalQueryVariables>(GetDevicesRentalDocument, options);
        }
export type GetDevicesRentalQueryHookResult = ReturnType<typeof useGetDevicesRentalQuery>;
export type GetDevicesRentalLazyQueryHookResult = ReturnType<typeof useGetDevicesRentalLazyQuery>;
export type GetDevicesRentalSuspenseQueryHookResult = ReturnType<typeof useGetDevicesRentalSuspenseQuery>;
export type GetDevicesRentalQueryResult = Apollo.QueryResult<GetDevicesRentalQuery, GetDevicesRentalQueryVariables>;
export const GetEventByIdDocument = gql`
    query GetEventById($getEventByIdId: String!) {
  getEventById(id: $getEventByIdId) {
    createdAt
    description
    eventFormat
    eventType {
      id
      name
    }
    id
    img
    isTemplate
    name
    rental {
      id
      rentalEndTime
      rentalStartTime
      totalPrice
      user {
        avatar
        createdAt
        dob
        email
        firstName
        gender
        id
        lastName
        phoneNumber
        role {
          id
          name
        }
        roleId
        updatedAt
      }
    }
  }
}
    `;


/**
 * __useGetEventByIdQuery__
 *
 * To run a query within a React component, call `useGetEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventByIdQuery({
 *   variables: {
 *      getEventByIdId: // value for 'getEventByIdId'
 *   },
 * });
 */
export function useGetEventByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables> & ({ variables: GetEventByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
      }
export function useGetEventByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
        }
export function useGetEventByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetEventByIdQuery, GetEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetEventByIdQuery, GetEventByIdQueryVariables>(GetEventByIdDocument, options);
        }
export type GetEventByIdQueryHookResult = ReturnType<typeof useGetEventByIdQuery>;
export type GetEventByIdLazyQueryHookResult = ReturnType<typeof useGetEventByIdLazyQuery>;
export type GetEventByIdSuspenseQueryHookResult = ReturnType<typeof useGetEventByIdSuspenseQuery>;
export type GetEventByIdQueryResult = Apollo.QueryResult<GetEventByIdQuery, GetEventByIdQueryVariables>;
export const GetEventsDocument = gql`
    query GetEvents($input: QueryFilterDto!) {
  getEvents(input: $input) {
    items {
      createdAt
      description
      eventFormat
      eventType {
        id
        name
      }
      id
      img
      isTemplate
      name
      rental {
        id
        rentalEndTime
        rentalStartTime
        totalPrice
        user {
          avatar
          createdAt
          dob
          email
          firstName
          gender
          id
          lastName
          phoneNumber
          role {
            id
            name
          }
          roleId
          updatedAt
        }
      }
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;

/**
 * __useGetEventsQuery__
 *
 * To run a query within a React component, call `useGetEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetEventsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEventsQuery, GetEventsQueryVariables> & ({ variables: GetEventsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
      }
export function useGetEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export function useGetEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetEventsQuery, GetEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetEventsQuery, GetEventsQueryVariables>(GetEventsDocument, options);
        }
export type GetEventsQueryHookResult = ReturnType<typeof useGetEventsQuery>;
export type GetEventsLazyQueryHookResult = ReturnType<typeof useGetEventsLazyQuery>;
export type GetEventsSuspenseQueryHookResult = ReturnType<typeof useGetEventsSuspenseQuery>;
export type GetEventsQueryResult = Apollo.QueryResult<GetEventsQuery, GetEventsQueryVariables>;
export const GetHumanResourcesAvailableDocument = gql`
    query GetHumanResourcesAvailable($input: GetServicesRequest!) {
  getHumanResourcesAvailable(input: $input) {
    items {
      availableQuantity
      hourlySalary
      id
      name
      quantity
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;

/**
 * __useGetHumanResourcesAvailableQuery__
 *
 * To run a query within a React component, call `useGetHumanResourcesAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHumanResourcesAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHumanResourcesAvailableQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetHumanResourcesAvailableQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetHumanResourcesAvailableQuery, GetHumanResourcesAvailableQueryVariables> & ({ variables: GetHumanResourcesAvailableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetHumanResourcesAvailableQuery, GetHumanResourcesAvailableQueryVariables>(GetHumanResourcesAvailableDocument, options);
      }
export function useGetHumanResourcesAvailableLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHumanResourcesAvailableQuery, GetHumanResourcesAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetHumanResourcesAvailableQuery, GetHumanResourcesAvailableQueryVariables>(GetHumanResourcesAvailableDocument, options);
        }
export function useGetHumanResourcesAvailableSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetHumanResourcesAvailableQuery, GetHumanResourcesAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetHumanResourcesAvailableQuery, GetHumanResourcesAvailableQueryVariables>(GetHumanResourcesAvailableDocument, options);
        }
export type GetHumanResourcesAvailableQueryHookResult = ReturnType<typeof useGetHumanResourcesAvailableQuery>;
export type GetHumanResourcesAvailableLazyQueryHookResult = ReturnType<typeof useGetHumanResourcesAvailableLazyQuery>;
export type GetHumanResourcesAvailableSuspenseQueryHookResult = ReturnType<typeof useGetHumanResourcesAvailableSuspenseQuery>;
export type GetHumanResourcesAvailableQueryResult = Apollo.QueryResult<GetHumanResourcesAvailableQuery, GetHumanResourcesAvailableQueryVariables>;
export const GetHumanResourcesRentalDocument = gql`
    query GetHumanResourcesRental($rentalId: String!) {
  getHumanResourcesRental(rentalId: $rentalId) {
    humanResource {
      availableQuantity
      hourlySalary
      id
      name
      quantity
    }
    id
    quantity
  }
}
    `;

/**
 * __useGetHumanResourcesRentalQuery__
 *
 * To run a query within a React component, call `useGetHumanResourcesRentalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHumanResourcesRentalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHumanResourcesRentalQuery({
 *   variables: {
 *      rentalId: // value for 'rentalId'
 *   },
 * });
 */
export function useGetHumanResourcesRentalQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetHumanResourcesRentalQuery, GetHumanResourcesRentalQueryVariables> & ({ variables: GetHumanResourcesRentalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetHumanResourcesRentalQuery, GetHumanResourcesRentalQueryVariables>(GetHumanResourcesRentalDocument, options);
      }
export function useGetHumanResourcesRentalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHumanResourcesRentalQuery, GetHumanResourcesRentalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetHumanResourcesRentalQuery, GetHumanResourcesRentalQueryVariables>(GetHumanResourcesRentalDocument, options);
        }
export function useGetHumanResourcesRentalSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetHumanResourcesRentalQuery, GetHumanResourcesRentalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetHumanResourcesRentalQuery, GetHumanResourcesRentalQueryVariables>(GetHumanResourcesRentalDocument, options);
        }
export type GetHumanResourcesRentalQueryHookResult = ReturnType<typeof useGetHumanResourcesRentalQuery>;
export type GetHumanResourcesRentalLazyQueryHookResult = ReturnType<typeof useGetHumanResourcesRentalLazyQuery>;
export type GetHumanResourcesRentalSuspenseQueryHookResult = ReturnType<typeof useGetHumanResourcesRentalSuspenseQuery>;
export type GetHumanResourcesRentalQueryResult = Apollo.QueryResult<GetHumanResourcesRentalQuery, GetHumanResourcesRentalQueryVariables>;
export const GetLocationsAvailableDocument = gql`
    query GetLocationsAvailable($input: GetServicesRequest!) {
  getLocationsAvailable(input: $input) {
    items {
      address
      id
      img
      name
      hourlyRentalFee
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;

/**
 * __useGetLocationsAvailableQuery__
 *
 * To run a query within a React component, call `useGetLocationsAvailableQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsAvailableQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsAvailableQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetLocationsAvailableQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLocationsAvailableQuery, GetLocationsAvailableQueryVariables> & ({ variables: GetLocationsAvailableQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLocationsAvailableQuery, GetLocationsAvailableQueryVariables>(GetLocationsAvailableDocument, options);
      }
export function useGetLocationsAvailableLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLocationsAvailableQuery, GetLocationsAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLocationsAvailableQuery, GetLocationsAvailableQueryVariables>(GetLocationsAvailableDocument, options);
        }
export function useGetLocationsAvailableSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetLocationsAvailableQuery, GetLocationsAvailableQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLocationsAvailableQuery, GetLocationsAvailableQueryVariables>(GetLocationsAvailableDocument, options);
        }
export type GetLocationsAvailableQueryHookResult = ReturnType<typeof useGetLocationsAvailableQuery>;
export type GetLocationsAvailableLazyQueryHookResult = ReturnType<typeof useGetLocationsAvailableLazyQuery>;
export type GetLocationsAvailableSuspenseQueryHookResult = ReturnType<typeof useGetLocationsAvailableSuspenseQuery>;
export type GetLocationsAvailableQueryResult = Apollo.QueryResult<GetLocationsAvailableQuery, GetLocationsAvailableQueryVariables>;
export const GetLocationsRentalDocument = gql`
    query GetLocationsRental($rentalId: String!) {
  getLocationsRental(rentalId: $rentalId) {
    id
    location {
      address
      id
      img
      name
    }
  }
}
    `;

/**
 * __useGetLocationsRentalQuery__
 *
 * To run a query within a React component, call `useGetLocationsRentalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLocationsRentalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLocationsRentalQuery({
 *   variables: {
 *      rentalId: // value for 'rentalId'
 *   },
 * });
 */
export function useGetLocationsRentalQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLocationsRentalQuery, GetLocationsRentalQueryVariables> & ({ variables: GetLocationsRentalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetLocationsRentalQuery, GetLocationsRentalQueryVariables>(GetLocationsRentalDocument, options);
      }
export function useGetLocationsRentalLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLocationsRentalQuery, GetLocationsRentalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetLocationsRentalQuery, GetLocationsRentalQueryVariables>(GetLocationsRentalDocument, options);
        }
export function useGetLocationsRentalSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetLocationsRentalQuery, GetLocationsRentalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetLocationsRentalQuery, GetLocationsRentalQueryVariables>(GetLocationsRentalDocument, options);
        }
export type GetLocationsRentalQueryHookResult = ReturnType<typeof useGetLocationsRentalQuery>;
export type GetLocationsRentalLazyQueryHookResult = ReturnType<typeof useGetLocationsRentalLazyQuery>;
export type GetLocationsRentalSuspenseQueryHookResult = ReturnType<typeof useGetLocationsRentalSuspenseQuery>;
export type GetLocationsRentalQueryResult = Apollo.QueryResult<GetLocationsRentalQuery, GetLocationsRentalQueryVariables>;
export const GetMeDocument = gql`
    query GetMe {
  getMe {
    avatar
    createdAt
    email
    firstName
    id
    lastName
    phoneNumber
    role {
      id
      name
    }
    roleId
    updatedAt
  }
}
    `;

/**
 * __useGetMeQuery__
 *
 * To run a query within a React component, call `useGetMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
      }
export function useGetMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export function useGetMeSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetMeQuery, GetMeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetMeQuery, GetMeQueryVariables>(GetMeDocument, options);
        }
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>;
export type GetMeLazyQueryHookResult = ReturnType<typeof useGetMeLazyQuery>;
export type GetMeSuspenseQueryHookResult = ReturnType<typeof useGetMeSuspenseQuery>;
export type GetMeQueryResult = Apollo.QueryResult<GetMeQuery, GetMeQueryVariables>;
export const GetRevenueStatisticByYearDocument = gql`
    query GetRevenueStatisticByYear($year: Float!) {
  getRevenueStatisticByYear(year: $year) {
    result {
      month
      revenue
    }
  }
}
    `;

/**
 * __useGetRevenueStatisticByYearQuery__
 *
 * To run a query within a React component, call `useGetRevenueStatisticByYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRevenueStatisticByYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRevenueStatisticByYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetRevenueStatisticByYearQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetRevenueStatisticByYearQuery, GetRevenueStatisticByYearQueryVariables> & ({ variables: GetRevenueStatisticByYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useQuery<GetRevenueStatisticByYearQuery, GetRevenueStatisticByYearQueryVariables>(GetRevenueStatisticByYearDocument, options);
}
export function useGetRevenueStatisticByYearLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRevenueStatisticByYearQuery, GetRevenueStatisticByYearQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return ApolloReactHooks.useLazyQuery<GetRevenueStatisticByYearQuery, GetRevenueStatisticByYearQueryVariables>(GetRevenueStatisticByYearDocument, options);
  }
export function useGetRevenueStatisticByYearSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetRevenueStatisticByYearQuery, GetRevenueStatisticByYearQueryVariables>) {
    const options = {...defaultOptions, ...baseOptions}
    return ApolloReactHooks.useSuspenseQuery<GetRevenueStatisticByYearQuery, GetRevenueStatisticByYearQueryVariables>(GetRevenueStatisticByYearDocument, options);
  }
export type GetRevenueStatisticByYearQueryHookResult = ReturnType<typeof useGetRevenueStatisticByYearQuery>;
export type GetRevenueStatisticByYearLazyQueryHookResult = ReturnType<typeof useGetRevenueStatisticByYearLazyQuery>;
export type GetRevenueStatisticByYearSuspenseQueryHookResult = ReturnType<typeof useGetRevenueStatisticByYearSuspenseQuery>;
export type GetRevenueStatisticByYearQueryResult = Apollo.QueryResult<GetRevenueStatisticByYearQuery, GetRevenueStatisticByYearQueryVariables>;

export const GetRoleDocument = gql`
    query GetRole($getRoleId: ID!) {
  getRole(id: $getRoleId) {
    id
    name
  }
}
    `;

/**
 * __useGetRoleQuery__
 *
 * To run a query within a React component, call `useGetRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoleQuery({
 *   variables: {
 *      getRoleId: // value for 'getRoleId'
 *   },
 * });
 */
export function useGetRoleQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetRoleQuery, GetRoleQueryVariables> & ({ variables: GetRoleQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
      }
export function useGetRoleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export function useGetRoleSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetRoleQuery, GetRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetRoleQuery, GetRoleQueryVariables>(GetRoleDocument, options);
        }
export type GetRoleQueryHookResult = ReturnType<typeof useGetRoleQuery>;
export type GetRoleLazyQueryHookResult = ReturnType<typeof useGetRoleLazyQuery>;
export type GetRoleSuspenseQueryHookResult = ReturnType<typeof useGetRoleSuspenseQuery>;
export type GetRoleQueryResult = Apollo.QueryResult<GetRoleQuery, GetRoleQueryVariables>;
export const GetRolesDocument = gql`
    query GetRoles($queryParams: QueryFilterDto!) {
  getRoles(queryParams: $queryParams) {
    items {
      id
      name
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;

/**
 * __useGetRolesQuery__
 *
 * To run a query within a React component, call `useGetRolesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRolesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRolesQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetRolesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetRolesQuery, GetRolesQueryVariables> & ({ variables: GetRolesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
      }
export function useGetRolesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export function useGetRolesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetRolesQuery, GetRolesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetRolesQuery, GetRolesQueryVariables>(GetRolesDocument, options);
        }
export type GetRolesQueryHookResult = ReturnType<typeof useGetRolesQuery>;
export type GetRolesLazyQueryHookResult = ReturnType<typeof useGetRolesLazyQuery>;
export type GetRolesSuspenseQueryHookResult = ReturnType<typeof useGetRolesSuspenseQuery>;
export type GetRolesQueryResult = Apollo.QueryResult<GetRolesQuery, GetRolesQueryVariables>;

export type CreateTimelineRequest = {
  description: Scalars["String"]["input"];
  timeStart: Scalars["DateTime"]["input"];
};
export type CreateEventTemplateRequest = {
  description: Scalars["String"]["input"];
  detail: Scalars["String"]["input"];
  devices?: InputMaybe<Array<CreateServiceRentalRequest>>;
  eventFormat?: InputMaybe<Scalars["Boolean"]["input"]>;
  eventType?: InputMaybe<CreateEventTypeRequest>;
  eventTypeId?: InputMaybe<Scalars["String"]["input"]>;
  humanResources?: InputMaybe<Array<CreateServiceRentalRequest>>;
  img?: InputMaybe<Scalars["String"]["input"]>;
  name: Scalars["String"]["input"];
  timeline?: InputMaybe<Array<CreateTimelineRequest>>;
}; 
export type CreateEventTemplateMutationVariables = Exact<{
  input: CreateEventTemplateRequest;
}>;
export const CreateEventTemplateDocument = gql`
  mutation CreateEventTemplate($input: CreateEventTemplateRequest!) {
    createEventTemplate(input: $input) {
      message
      success
    }
  }
`;
export type CreateEventTemplateMutation = {
  __typename?: "Mutation";
  createEventTemplate: { __typename?: "ResponseMessageBase"; message: string; success: boolean };
};
export type CreateEventTemplateMutationFn = Apollo.MutationFunction<CreateEventTemplateMutation, CreateEventTemplateMutationVariables>;
export function useCreateEventTemplateMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEventTemplateMutation, CreateEventTemplateMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<CreateEventTemplateMutation, CreateEventTemplateMutationVariables>(CreateEventTemplateDocument, options);
}
export type CreateEventTemplateMutationHookResult = ReturnType<typeof useCreateEventTemplateMutation>;
export type CreateEventTemplateMutationResult = Apollo.MutationResult<CreateEventTemplateMutation>;
export type CreateEventTemplateMutationOptions = Apollo.BaseMutationOptions<CreateEventTemplateMutation, CreateEventTemplateMutationVariables>;

export const GetDevicesDocument = gql`
  query GetDevices($input: QueryFilterDto!) {
    getDevices(input: $input) {
      items {
        availableQuantity
        description
        hourlyRentalFee
        id
        img
        name
        quantity
        createdAt
      }
      meta {
        currentPage
        itemCount
        itemsPerPage
        totalItems
        totalPages
      }
    }
  }
`;
export type GetDevicesQuery = {
  __typename?: "Query";
  getDevices: {
    __typename?: "DevicesData";
    items: Array<{
      __typename?: "DeviceData";
      availableQuantity?: number | null;
      description: string;
      hourlyRentalFee: number;
      id: string;
      img: string;
      name: string;
      quantity: number;
      createdAt: any;
    }>;
    meta: {
      __typename?: "MetaPaginationInterface";
      currentPage: number;
      itemCount: number;
      itemsPerPage: number;
      totalItems: number;
      totalPages: number;
    };
  };
};
export type GetDevicesQueryVariables = Exact<{
  input: QueryFilterDto;
}>;
export function useGetDevicesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<GetDevicesQuery, GetDevicesQueryVariables> &
    ({ variables: GetDevicesQueryVariables; skip?: boolean } | { skip: boolean })
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<GetDevicesQuery, GetDevicesQueryVariables>(GetDevicesDocument, options);
}
export function useGetDevicesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDevicesQuery, GetDevicesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<GetDevicesQuery, GetDevicesQueryVariables>(GetDevicesDocument, options);
}
export function useGetDevicesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetDevicesQuery, GetDevicesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<GetDevicesQuery, GetDevicesQueryVariables>(GetDevicesDocument, options);
}
export type GetDevicesQueryHookResult = ReturnType<typeof useGetDevicesQuery>;
export type GetDevicesLazyQueryHookResult = ReturnType<typeof useGetDevicesLazyQuery>;
export type GetDevicesSuspenseQueryHookResult = ReturnType<typeof useGetDevicesSuspenseQuery>;
export type GetDevicesQueryResult = Apollo.QueryResult<GetDevicesQuery, GetDevicesQueryVariables>;

export type DeleteEventTemplateMutationVariables = Exact<{
  deleteEventTemplateId: Scalars['String']['input'];
}>;

export const DeleteEventTemplateDocument = gql`
    mutation DeleteEventTemplate($deleteEventTemplateId: String!) {
  deleteEventTemplate(id: $deleteEventTemplateId) {
    message
    success
  }
}
    `;
export type DeleteEventTemplateMutation = { __typename?: 'Mutation', deleteEventTemplate: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export function useDeleteEventTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteEventTemplateMutation, DeleteEventTemplateMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<DeleteEventTemplateMutation, DeleteEventTemplateMutationVariables>(DeleteEventTemplateDocument, options);
}
export type DeleteEventTemplateMutationHookResult = ReturnType<typeof useDeleteEventTemplateMutation>;
export type DeleteEventTemplateMutationResult = Apollo.MutationResult<DeleteEventTemplateMutation>;
export type DeleteEventTemplateMutationOptions = Apollo.BaseMutationOptions<DeleteEventTemplateMutation, DeleteEventTemplateMutationVariables>;

export type GetEventsTemplateQueryVariables = Exact<{
  input: QueryFilterDto;
}>;

export const GetEventsTemplateDocument = gql`
    query GetEventsTemplate($input: QueryFilterDto!) {
  getEventsTemplate(input: $input) {
    items {
      createdAt
      description
      detail
      eventFormat
      eventType {
        id
        name
      }
      id
      img
      isTemplate
      name
      rental {
        customLocation
        devices {
          availableQuantity
          createdAt
          description
          hourlyRentalFee
          id
          img
          name
          quantity
        }
        event {
          createdAt
          description
          detail
          eventFormat
          id
          img
          isTemplate
          name
        }
        humanResources {
          availableQuantity
          createdAt
          description
          hourlySalary
          id
          img
          name
          quantity
        }
        id
        locations {
          address
          createdAt
          description
          hourlyRentalFee
          id
          img
          name
        }
        rentalEndTime
        rentalStartTime
        timelines {
          description
          id
          startTime
        }
        totalPrice
        user {
          avatar
          createdAt
          dob
          email
          firstName
          gender
          id
          lastName
          phoneNumber
          role {
            id
            name
          }
          roleId
          updatedAt
        }
      }
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;

export type GetEventsTemplateQuery = { __typename?: 'Query', getEventsTemplate: { __typename?: 'EventsData', items: Array<{ __typename?: 'EventData', createdAt: any, description: string, detail: string, eventFormat: boolean, id: string, img?: string | null, isTemplate: boolean, name: string, eventType?: { __typename?: 'EventTypeData', id: string, name: string } | null, rental?: { __typename?: 'RentalData', customLocation?: string | null, id: string, rentalEndTime?: any | null, rentalStartTime?: any | null, totalPrice: number, devices?: Array<{ __typename?: 'DeviceData', availableQuantity?: number | null, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number }> | null, event?: { __typename?: 'EventData', createdAt: any, description: string, detail: string, eventFormat: boolean, id: string, img?: string | null, isTemplate: boolean, name: string } | null, humanResources?: Array<{ __typename?: 'HumanResourceData', availableQuantity?: number | null, createdAt: any, description: string, hourlySalary: number, id: string, img?: string | null, name: string, quantity: number }> | null, locations?: Array<{ __typename?: 'LocationData', address: string, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string }> | null, timelines?: Array<{ __typename?: 'TimelineData', description: string, id: string, startTime: any }> | null, user: { __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } } | null }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };

export function useGetEventsTemplateQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEventsTemplateQuery, GetEventsTemplateQueryVariables> & ({ variables: GetEventsTemplateQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useQuery<GetEventsTemplateQuery, GetEventsTemplateQueryVariables>(GetEventsTemplateDocument, options);
}
export const GetUserStatisticByYearDocument = gql`
    query GetUserStatisticByYear($year: Float!) {
  getUserStatisticByYear(year: $year) {
    result {
      month
      user
    }
  }
}
    `;

/**
 * __useGetUserStatisticByYearQuery__
 *
 * To run a query within a React component, call `useGetUserStatisticByYearQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserStatisticByYearQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserStatisticByYearQuery({
 *   variables: {
 *      year: // value for 'year'
 *   },
 * });
 */
export function useGetUserStatisticByYearQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUserStatisticByYearQuery, GetUserStatisticByYearQueryVariables> & ({ variables: GetUserStatisticByYearQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUserStatisticByYearQuery, GetUserStatisticByYearQueryVariables>(GetUserStatisticByYearDocument, options);
      }
export function useGetUserStatisticByYearLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUserStatisticByYearQuery, GetUserStatisticByYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUserStatisticByYearQuery, GetUserStatisticByYearQueryVariables>(GetUserStatisticByYearDocument, options);
        }
export function useGetUserStatisticByYearSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUserStatisticByYearQuery, GetUserStatisticByYearQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUserStatisticByYearQuery, GetUserStatisticByYearQueryVariables>(GetUserStatisticByYearDocument, options);
        }
export type GetUserStatisticByYearQueryHookResult = ReturnType<typeof useGetUserStatisticByYearQuery>;
export type GetUserStatisticByYearLazyQueryHookResult = ReturnType<typeof useGetUserStatisticByYearLazyQuery>;
export type GetUserStatisticByYearSuspenseQueryHookResult = ReturnType<typeof useGetUserStatisticByYearSuspenseQuery>;
export type GetUserStatisticByYearQueryResult = Apollo.QueryResult<GetUserStatisticByYearQuery, GetUserStatisticByYearQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($queryParams: GetUsersRequest!) {
  getUsers(queryParams: $queryParams) {
    items {
      avatar
      createdAt
      dob
      email
      firstName
      gender
      id
      lastName
      phoneNumber
      role {
        id
        name
      }
      roleId
      status
      updatedAt
      }
    }
  }`;    
/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables> & ({ variables: GetUsersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export function useGetUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersSuspenseQueryHookResult = ReturnType<typeof useGetUsersSuspenseQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;

export const GetHumanResourcesDocument = gql`
    query GetHumanResources($input: QueryFilterDto!) {
  getHumanResources(input: $input) {
    items {
      availableQuantity
      createdAt
      description
      hourlySalary
      id
      img
      name
      quantity
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;
export type GetHumanResourcesQueryVariables = Exact<{
  input: QueryFilterDto;
}>;
export type GetHumanResourcesQuery = { __typename?: 'Query', getHumanResources: { __typename?: 'HumanResourcesData', items: Array<{ __typename?: 'HumanResourceData', availableQuantity?: number | null, createdAt: any, description: string, hourlySalary: number, id: string, img?: string | null, name: string, quantity: number }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };
export function useGetHumanResourcesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetHumanResourcesQuery, GetHumanResourcesQueryVariables> & ({ variables: GetHumanResourcesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useQuery<GetHumanResourcesQuery, GetHumanResourcesQueryVariables>(GetHumanResourcesDocument, options);
}
export function useGetHumanResourcesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHumanResourcesQuery, GetHumanResourcesQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useLazyQuery<GetHumanResourcesQuery, GetHumanResourcesQueryVariables>(GetHumanResourcesDocument, options);
}
export function useGetHumanResourcesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetHumanResourcesQuery, GetHumanResourcesQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useSuspenseQuery<GetHumanResourcesQuery, GetHumanResourcesQueryVariables>(GetHumanResourcesDocument, options);
}
export type GetHumanResourcesQueryHookResult = ReturnType<typeof useGetHumanResourcesQuery>;
export type GetHumanResourcesLazyQueryHookResult = ReturnType<typeof useGetHumanResourcesLazyQuery>;
export type GetHumanResourcesSuspenseQueryHookResult = ReturnType<typeof useGetHumanResourcesSuspenseQuery>;
export type GetHumanResourcesQueryResult = Apollo.QueryResult<GetHumanResourcesQuery, GetHumanResourcesQueryVariables>;

export type UpsertTimelineRequest = {
  description: Scalars['String']['input'];
  id?: InputMaybe<Scalars['String']['input']>;
  timeStart: Scalars['DateTime']['input'];
};

export type UpdateEventTemplateRequest = {
  description?: InputMaybe<Scalars['String']['input']>;
  detail?: InputMaybe<Scalars['String']['input']>;
  devices?: InputMaybe<Array<CreateServiceRentalRequest>>;
  eventFormat?: InputMaybe<Scalars['Boolean']['input']>;
  eventType?: InputMaybe<CreateEventTypeRequest>;
  eventTypeId?: InputMaybe<Scalars['String']['input']>;
  humanResources?: InputMaybe<Array<CreateServiceRentalRequest>>;
  id: Scalars['ID']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  timeline?: InputMaybe<Array<UpsertTimelineRequest>>;
};
export type MutationUpdateEventTemplateArgs = {
  input: UpdateEventTemplateRequest;
};
export type UpdateEventTemplateMutationVariables = Exact<{
  input: UpdateEventTemplateRequest;
}>;
export type UpdateHumanResourcesRequest = {
  description?: InputMaybe<Scalars['String']['input']>;
  hourlySalary?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateEventTemplateMutation = { __typename?: 'Mutation', updateEventTemplate: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export type UpdateHumanResourceMutationVariables = Exact<{
  input: UpdateHumanResourcesRequest;
}>;

export const UpdateEventTemplateDocument = gql`
    mutation UpdateEventTemplate($input: UpdateEventTemplateRequest!) {
  updateEventTemplate(input: $input) {
    message
    success
  }
}
    `;
export function useUpdateEventTemplateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateEventTemplateMutation, UpdateEventTemplateMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<UpdateEventTemplateMutation, UpdateEventTemplateMutationVariables>(UpdateEventTemplateDocument, options);
}
export type UpdateEventTemplateMutationHookResult = ReturnType<typeof useUpdateEventTemplateMutation>;
export type UpdateEventTemplateMutationResult = Apollo.MutationResult<UpdateEventTemplateMutation>;
export type UpdateEventTemplateMutationOptions = Apollo.BaseMutationOptions<UpdateEventTemplateMutation, UpdateEventTemplateMutationVariables>;

export type DeleteDeviceMutationVariables = Exact<{
  deleteDeviceId: Scalars['String']['input'];
}>;


export const DeleteDeviceDocument = gql`
    mutation DeleteDevice($deleteDeviceId: String!) {
  deleteDevice(id: $deleteDeviceId) {
    message
    success
  }
}
    `;
export type DeleteDeviceMutationFn = Apollo.MutationFunction<DeleteDeviceMutation, DeleteDeviceMutationVariables>;
export type DeleteDeviceMutation = { __typename?: 'Mutation', deleteDevice: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export function useDeleteDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<DeleteDeviceMutation, DeleteDeviceMutationVariables>(DeleteDeviceDocument, options);
}
export type DeleteDeviceMutationHookResult = ReturnType<typeof useDeleteDeviceMutation>;
export type DeleteDeviceMutationResult = Apollo.MutationResult<DeleteDeviceMutation>;
export type DeleteDeviceMutationOptions = Apollo.BaseMutationOptions<DeleteDeviceMutation, DeleteDeviceMutationVariables>;


export type GetDeviceByIdQueryVariables = Exact<{
  getDeviceByIdId: Scalars['String']['input'];
}>;

export type GetDeviceByIdQuery = { __typename?: 'Query', getDeviceById: { __typename?: 'DeviceData', availableQuantity?: number | null, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number } };
export const GetDeviceByIdDocument = gql`
    query GetDeviceById($getDeviceByIdId: String!) {
  getDeviceById(id: $getDeviceByIdId) {
    availableQuantity
    createdAt
    description
    hourlyRentalFee
    id
    img
    name
    quantity
  }
}
    `;
export function useGetDeviceByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetDeviceByIdQuery, GetDeviceByIdQueryVariables> & ({ variables: GetDeviceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useQuery<GetDeviceByIdQuery, GetDeviceByIdQueryVariables>(GetDeviceByIdDocument, options);
}
export function useGetDeviceByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetDeviceByIdQuery, GetDeviceByIdQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useLazyQuery<GetDeviceByIdQuery, GetDeviceByIdQueryVariables>(GetDeviceByIdDocument, options);
}
export function useGetDeviceByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetDeviceByIdQuery, GetDeviceByIdQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useSuspenseQuery<GetDeviceByIdQuery, GetDeviceByIdQueryVariables>(GetDeviceByIdDocument, options);
}
export type GetDeviceByIdQueryHookResult = ReturnType<typeof useGetDeviceByIdQuery>;
export type GetDeviceByIdLazyQueryHookResult = ReturnType<typeof useGetDeviceByIdLazyQuery>;
export type GetDeviceByIdSuspenseQueryHookResult = ReturnType<typeof useGetDeviceByIdSuspenseQuery>;
export type GetDeviceByIdQueryResult = Apollo.QueryResult<GetDeviceByIdQuery, GetDeviceByIdQueryVariables>;

export type MutationUpdateDeviceArgs = {
  input: UpdateDeviceRequest;
};
export type UpdateDeviceRequest = {
  description?: InputMaybe<Scalars['String']['input']>;
  hourlyRentalFee?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};
export type UpdateDeviceMutationVariables = Exact<{
  input: UpdateDeviceRequest;
}>;

export const UpdateDeviceDocument = gql`
    mutation UpdateDevice($input: UpdateDeviceRequest!) {
  updateDevice(input: $input) {
    message
    success
  }
}
    `;
export type UpdateDeviceMutationFn = Apollo.MutationFunction<UpdateDeviceMutation, UpdateDeviceMutationVariables>;
export type UpdateDeviceMutation = { __typename?: 'Mutation', updateDevice: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export function useUpdateDeviceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateDeviceMutation, UpdateDeviceMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<UpdateDeviceMutation, UpdateDeviceMutationVariables>(UpdateDeviceDocument, options);
}
export type UpdateDeviceMutationHookResult = ReturnType<typeof useUpdateDeviceMutation>;
export type UpdateDeviceMutationResult = Apollo.MutationResult<UpdateDeviceMutation>;
export type UpdateDeviceMutationOptions = Apollo.BaseMutationOptions<UpdateDeviceMutation, UpdateDeviceMutationVariables>;

export type DeleteHumanResourceMutationVariables = Exact<{
  deleteHumanResourceId: Scalars['String']['input'];
}>;


export type DeleteHumanResourceMutation = { __typename?: 'Mutation', deleteHumanResource: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export const DeleteHumanResourceDocument = gql`
    mutation DeleteHumanResource($deleteHumanResourceId: String!) {
  deleteHumanResource(id: $deleteHumanResourceId) {
    message
    success
  }
}
    `;
export function useDeleteHumanResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteHumanResourceMutation, DeleteHumanResourceMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<DeleteHumanResourceMutation, DeleteHumanResourceMutationVariables>(DeleteHumanResourceDocument, options);
}
export type DeleteHumanResourceMutationHookResult = ReturnType<typeof useDeleteHumanResourceMutation>;
export type DeleteHumanResourceMutationResult = Apollo.MutationResult<DeleteHumanResourceMutation>;
export type DeleteHumanResourceMutationOptions = Apollo.BaseMutationOptions<DeleteHumanResourceMutation, DeleteHumanResourceMutationVariables>;

export type UpdateHumanResourceMutation = { __typename?: 'Mutation', updateHumanResource: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };
export const UpdateHumanResourceDocument = gql`
    mutation UpdateHumanResource($input: UpdateHumanResourcesRequest!) {
  updateHumanResource(input: $input) {
    message
    success
  }
}
    `;
export type UpdateHumanResourceMutationFn = Apollo.MutationFunction<UpdateHumanResourceMutation, UpdateHumanResourceMutationVariables>;
export function useUpdateHumanResourceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateHumanResourceMutation, UpdateHumanResourceMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<UpdateHumanResourceMutation, UpdateHumanResourceMutationVariables>(UpdateHumanResourceDocument, options);
}
export type UpdateHumanResourceMutationHookResult = ReturnType<typeof useUpdateHumanResourceMutation>;
export type UpdateHumanResourceMutationResult = Apollo.MutationResult<UpdateHumanResourceMutation>;
export type UpdateHumanResourceMutationOptions = Apollo.BaseMutationOptions<UpdateHumanResourceMutation, UpdateHumanResourceMutationVariables>;

export type GetHumanResourceByIdQueryVariables = Exact<{
  getHumanResourceByIdId: Scalars['String']['input'];
}>;


export type GetHumanResourceByIdQuery = { __typename?: 'Query', getHumanResourceById: { __typename?: 'HumanResourceData', availableQuantity?: number | null, createdAt: any, description: string, hourlySalary: number, id: string, img?: string | null, name: string, quantity: number } };
export const GetHumanResourceByIdDocument = gql`
    query GetHumanResourceById($getHumanResourceByIdId: String!) {
  getHumanResourceById(id: $getHumanResourceByIdId) {
    availableQuantity
    createdAt
    description
    hourlySalary
    id
    img
    name
    quantity
  }
}
    `;
export function useGetHumanResourceByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetHumanResourceByIdQuery, GetHumanResourceByIdQueryVariables> & ({ variables: GetHumanResourceByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useQuery<GetHumanResourceByIdQuery, GetHumanResourceByIdQueryVariables>(GetHumanResourceByIdDocument, options);
}
export function useGetHumanResourceByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetHumanResourceByIdQuery, GetHumanResourceByIdQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useLazyQuery<GetHumanResourceByIdQuery, GetHumanResourceByIdQueryVariables>(GetHumanResourceByIdDocument, options);
}
export function useGetHumanResourceByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetHumanResourceByIdQuery, GetHumanResourceByIdQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useSuspenseQuery<GetHumanResourceByIdQuery, GetHumanResourceByIdQueryVariables>(GetHumanResourceByIdDocument, options);
}
export type GetHumanResourceByIdQueryHookResult = ReturnType<typeof useGetHumanResourceByIdQuery>;
export type GetHumanResourceByIdLazyQueryHookResult = ReturnType<typeof useGetHumanResourceByIdLazyQuery>;
export type GetHumanResourceByIdSuspenseQueryHookResult = ReturnType<typeof useGetHumanResourceByIdSuspenseQuery>;
export type GetHumanResourceByIdQueryResult = Apollo.QueryResult<GetHumanResourceByIdQuery, GetHumanResourceByIdQueryVariables>;

export const DeleteLocationDocument = gql`
    mutation DeleteLocation($deleteLocationId: String!) {
  deleteLocation(id: $deleteLocationId) {
    message
    success
  }
}
    `;
export type DeleteLocationMutationVariables = Exact<{
  deleteLocationId: Scalars['String']['input'];
}>;


export type DeleteLocationMutation = { __typename?: 'Mutation', deleteLocation: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export function useDeleteLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteLocationMutation, DeleteLocationMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<DeleteLocationMutation, DeleteLocationMutationVariables>(DeleteLocationDocument, options);
}
export type DeleteLocationMutationHookResult = ReturnType<typeof useDeleteLocationMutation>;
export type DeleteLocationMutationResult = Apollo.MutationResult<DeleteLocationMutation>;
export type DeleteLocationMutationOptions = Apollo.BaseMutationOptions<DeleteLocationMutation, DeleteLocationMutationVariables>;

export type UpdateLocationRequest = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  hourlyRentalFee?: InputMaybe<Scalars['Float']['input']>;
  id: Scalars['ID']['input'];
  img?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};
export const UpdateLocationDocument = gql`
    mutation UpdateLocation($input: UpdateLocationRequest!) {
  updateLocation(input: $input) {
    message
    success
  }
}
    `;
export type UpdateLocationMutationFn = Apollo.MutationFunction<UpdateLocationMutation, UpdateLocationMutationVariables>;
export type UpdateLocationMutationVariables = Exact<{
  input: UpdateLocationRequest;
}>;


export type UpdateLocationMutation = { __typename?: 'Mutation', updateLocation: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export function useUpdateLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateLocationMutation, UpdateLocationMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<UpdateLocationMutation, UpdateLocationMutationVariables>(UpdateLocationDocument, options);
}
export type UpdateLocationMutationHookResult = ReturnType<typeof useUpdateLocationMutation>;
export type UpdateLocationMutationResult = Apollo.MutationResult<UpdateLocationMutation>;
export type UpdateLocationMutationOptions = Apollo.BaseMutationOptions<UpdateLocationMutation, UpdateLocationMutationVariables>;

export const GetLocationsDocument = gql`
    query GetLocations($input: QueryFilterDto!) {
  getLocations(input: $input) {
    items {
      address
      createdAt
      description
      hourlyRentalFee
      id
      img
      name
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;  
export type GetLocationsQueryVariables = Exact<{
  input: QueryFilterDto;
}>;
  export type GetLocationsQuery = { __typename?: 'Query', getLocations: { __typename?: 'LocationsData', items: Array<{ __typename?: 'LocationData', address: string, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };    
export function useGetLocationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLocationsQuery, GetLocationsQueryVariables> & ({ variables: GetLocationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useQuery<GetLocationsQuery, GetLocationsQueryVariables>(GetLocationsDocument, options);
}

export const GetLocationByIdDocument = gql`
    query GetLocationById($getLocationByIdId: String!) {
  getLocationById(id: $getLocationByIdId) {
    address
    createdAt
    description
    hourlyRentalFee
    id
    img
    name
  }
}
    `;
export type GetLocationByIdQueryVariables = Exact<{
   getLocationByIdId: Scalars['String']['input'];
}>; 
export type GetLocationByIdQuery = { __typename?: 'Query', getLocationById: { __typename?: 'LocationData', address: string, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string } };
export function useGetLocationByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetLocationByIdQuery, GetLocationByIdQueryVariables> & ({ variables: GetLocationByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useQuery<GetLocationByIdQuery, GetLocationByIdQueryVariables>(GetLocationByIdDocument, options);
}
export function useGetLocationByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetLocationByIdQuery, GetLocationByIdQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useLazyQuery<GetLocationByIdQuery, GetLocationByIdQueryVariables>(GetLocationByIdDocument, options);
}
export function useGetLocationByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetLocationByIdQuery, GetLocationByIdQueryVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useSuspenseQuery<GetLocationByIdQuery, GetLocationByIdQueryVariables>(GetLocationByIdDocument, options);
}
export type GetLocationByIdQueryHookResult = ReturnType<typeof useGetLocationByIdQuery>;
export type GetLocationByIdLazyQueryHookResult = ReturnType<typeof useGetLocationByIdLazyQuery>;
export type GetLocationByIdSuspenseQueryHookResult = ReturnType<typeof useGetLocationByIdSuspenseQuery>;
export type GetLocationByIdQueryResult = Apollo.QueryResult<GetLocationByIdQuery, GetLocationByIdQueryVariables>;

export enum UserStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE'
}

export type ActivateUserMutationVariables = Exact<{
  activateUserId: Scalars['String']['input'];
}>;


export type ActivateUserMutation = { __typename?: 'Mutation', activateUser: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export const ActivateUserDocument = gql`
    mutation ActivateUser($activateUserId: String!) {
  activateUser(id: $activateUserId) {
    message
    success
  }
}
   `;
export function useActivateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, options);
}


export type DeactivateUserMutationVariables = Exact<{
  deactivateUserId: Scalars['String']['input'];
}>;


export type DeactivateUserMutation = { __typename?: 'Mutation', deactivateUser: { __typename?: 'ResponseMessageBase', message: string, success: boolean } };

export const DeactivateUserDocument = gql`
    mutation DeactivateUser($deactivateUserId: String!) {
  deactivateUser(id: $deactivateUserId) {
    message
    success
  }
}
    `;
export function useDeactivateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeactivateUserMutation, DeactivateUserMutationVariables>) {
  const options = {...defaultOptions, ...baseOptions}
  return ApolloReactHooks.useMutation<DeactivateUserMutation, DeactivateUserMutationVariables>(DeactivateUserDocument, options);
}


export const GetContractDocument = gql`
    query GetContract($getContractId: String!) {
  getContract(id: $getContractId) {
    createdAt
    customer {
      address
      id
      name
      phoneNumber
    }
    id
    name
    rental {
      customLocation
      devices {
        availableQuantity
        createdAt
        description
        hourlyRentalFee
        id
        img
        name
        quantity
      }
      event {
        createdAt
        description
        detail
        eventFormat
        eventType {
          id
          name
        }
        id
        img
        isTemplate
        name
      }
      humanResources {
        availableQuantity
        createdAt
        description
        hourlySalary
        id
        img
        name
        quantity
      }
      id
      locations {
        address
        createdAt
        description
        hourlyRentalFee
        id
        img
        name
      }
      rentalEndTime
      rentalStartTime
      totalPrice
      user {
        avatar
        createdAt
        dob
        email
        firstName
        gender
        id
        lastName
        phoneNumber
        role {
          id
          name
        }
        roleId
        updatedAt
      }
    }
    singingDate
    status
    updatedAt
  }
}
    `;

/**
 * __useGetContractQuery__
 *
 * To run a query within a React component, call `useGetContractQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractQuery({
 *   variables: {
 *      getContractId: // value for 'getContractId'
 *   },
 * });
 */
export function useGetContractQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetContractQuery, GetContractQueryVariables> & ({ variables: GetContractQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
      }
export function useGetContractLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
        }
export function useGetContractSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetContractQuery, GetContractQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetContractQuery, GetContractQueryVariables>(GetContractDocument, options);
        }
export type GetContractQueryHookResult = ReturnType<typeof useGetContractQuery>;
export type GetContractLazyQueryHookResult = ReturnType<typeof useGetContractLazyQuery>;
export type GetContractSuspenseQueryHookResult = ReturnType<typeof useGetContractSuspenseQuery>;
export type GetContractQueryResult = Apollo.QueryResult<GetContractQuery, GetContractQueryVariables>;
export const ConfirmContractDepositDocument = gql`
    mutation ConfirmContractDeposit($input: ConfirmContractDeposit!) {
  confirmContractDeposit(input: $input) {
    createdAt
    customer {
      address
      id
      name
      phoneNumber
    }
    id
    name
    rental {
      customLocation
      devices {
        availableQuantity
        createdAt
        description
        hourlyRentalFee
        id
        img
        name
        quantity
      }
      event {
        createdAt
        description
        detail
        eventFormat
        eventType {
          id
          name
        }
        id
        img
        isTemplate
        name
      }
      humanResources {
        availableQuantity
        createdAt
        description
        hourlySalary
        id
        img
        name
        quantity
      }
      id
      locations {
        address
        createdAt
        description
        hourlyRentalFee
        id
        img
        name
      }
      rentalEndTime
      rentalStartTime
      totalPrice
      user {
        avatar
        createdAt
        dob
        email
        firstName
        gender
        id
        lastName
        phoneNumber
        role {
          id
          name
        }
        roleId
        updatedAt
      }
    }
    singingDate
    status
    updatedAt
  }
}
    `;
export type ConfirmContractDepositMutationFn = Apollo.MutationFunction<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>;

/**
 * __useConfirmContractDepositMutation__
 *
 * To run a mutation, you first call `useConfirmContractDepositMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConfirmContractDepositMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [confirmContractDepositMutation, { data, loading, error }] = useConfirmContractDepositMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConfirmContractDepositMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>(ConfirmContractDepositDocument, options);
      }
export type ConfirmContractDepositMutationHookResult = ReturnType<typeof useConfirmContractDepositMutation>;
export type ConfirmContractDepositMutationResult = Apollo.MutationResult<ConfirmContractDepositMutation>;
export type ConfirmContractDepositMutationOptions = Apollo.BaseMutationOptions<ConfirmContractDepositMutation, ConfirmContractDepositMutationVariables>;
export type ConfirmContractDepositMutationVariables = Exact<{
  input: ConfirmContractDeposit;
}>;


export type ConfirmContractDepositMutation = { __typename?: 'Mutation', confirmContractDeposit: { __typename?: 'ContractData', createdAt: any, id: string, name: string, singingDate?: any | null, status?: Contract_Status | null, updatedAt: any, customer?: { __typename?: 'CustomerData', address: string, id: string, name: string, phoneNumber: string } | null, rental: { __typename?: 'RentalData', customLocation?: string | null, id: string, rentalEndTime?: any | null, rentalStartTime?: any | null, totalPrice: number, devices?: Array<{ __typename?: 'DeviceData', availableQuantity?: number | null, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string, quantity: number }> | null, event?: { __typename?: 'EventData', createdAt: any, description: string, detail: string, eventFormat: boolean, id: string, img?: string | null, isTemplate: boolean, name: string, eventType?: { __typename?: 'EventTypeData', id: string, name: string } | null } | null, humanResources?: Array<{ __typename?: 'HumanResourceData', availableQuantity?: number | null, createdAt: any, description: string, hourlySalary: number, id: string, img?: string | null, name: string, quantity: number }> | null, locations?: Array<{ __typename?: 'LocationData', address: string, createdAt: any, description: string, hourlyRentalFee: number, id: string, img: string, name: string }> | null, user: { __typename?: 'UserData', avatar?: string | null, createdAt?: any | null, dob?: any | null, email: string, firstName: string, gender?: boolean | null, id: string, lastName: string, phoneNumber?: string | null, roleId: string, updatedAt?: any | null, role?: { __typename?: 'RoleData', id: string, name: string } | null } } } };


export type GetEmailSendLogRequest = {
  contractId: Scalars['ID']['input'];
  /**
   *
   * - Filter equal: filters:[{field: "User.name", operator: eq, data: "Cam"}]
   * - Filter not equal: filters:[{field: "User.name", operator: neq, data: "Cam"}]
   * - Filter less than: filters:[{field: "User.age", operator: lt, data: 40}]
   * - Filter greater than: filters:[{field: "User.age", operator: gt, data: 40}]
   * - Filter less than and equal: filters:[{field: "User.age", operator: lte, data: 40}]
   * - Filter greater than and equal: filters:[{field: "User.age", operator: gte, data: 40}]
   * - Filter field in many choice: filters:[{field: "User.name", operator: in, data: "Cam,Camm"}]
   * - Filter field not in many choice: filters:[{field: "User.name", operator: nin, data: "Cam,camm"}]
   * - Filter field by text: filters:[{field: "User.name", operator: like, data: "Cam"}]
   */
  filters?: InputMaybe<Array<FilterDto>>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  limit?: InputMaybe<Scalars['Float']['input']>;
  /**
   *
   * - Order by fields and order reverse use prefix "ASC or DESC". Ex: orderBy: "User.createdAt:DESC"
   * - Use NULLS_FIRST OR NULLS_LAST to determine where null value should be, Ex: orderBy: "User.createdAt:DESC:NULLS_FIRST"
   *
   */
  orderBy?: InputMaybe<Scalars['String']['input']>;
  /**
   *
   * - Paginate with limit and offset. Ex: limit:10, page:1
   *
   */
  page?: Scalars['Float']['input'];
  /**
   *
   * - Query by text. Ex: q:"abcxyz"
   *
   */
  q?: InputMaybe<Scalars['String']['input']>;
};
export const GetContractsDocument = gql`
    query GetContracts($queryParams: GetContractsRequest!) {
  getContracts(queryParams: $queryParams) {
    items {
      createdAt
      customer {
        address
        id
        name
        phoneNumber
      }
      id
      name
      rental {
        customLocation
        devices {
          availableQuantity
          createdAt
          description
          hourlyRentalFee
          id
          img
          name
          quantity
        }
        event {
          createdAt
          description
          detail
          eventFormat
          eventType {
            id
            name
          }
          id
          img
          isTemplate
          name
        }
        humanResources {
          availableQuantity
          createdAt
          description
          hourlySalary
          id
          img
          name
          quantity
        }
        id
        locations {
          address
          createdAt
          description
          hourlyRentalFee
          id
          img
          name
        }
        rentalEndTime
        rentalStartTime
        totalPrice
        user {
          avatar
          createdAt
          dob
          email
          firstName
          gender
          id
          lastName
          phoneNumber
          role {
            id
            name
          }
          roleId
          updatedAt
        }
      }
      singingDate
      status
      updatedAt
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;

/**
 * __useGetContractsQuery__
 *
 * To run a query within a React component, call `useGetContractsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetContractsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetContractsQuery({
 *   variables: {
 *      queryParams: // value for 'queryParams'
 *   },
 * });
 */
export function useGetContractsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetContractsQuery, GetContractsQueryVariables> & ({ variables: GetContractsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
      }
export function useGetContractsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export function useGetContractsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetContractsQuery, GetContractsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GetContractsQuery, GetContractsQueryVariables>(GetContractsDocument, options);
        }
export type GetContractsQueryHookResult = ReturnType<typeof useGetContractsQuery>;
export type GetContractsLazyQueryHookResult = ReturnType<typeof useGetContractsLazyQuery>;
export type GetContractsSuspenseQueryHookResult = ReturnType<typeof useGetContractsSuspenseQuery>;
export type GetContractsQueryResult = Apollo.QueryResult<GetContractsQuery, GetContractsQueryVariables>;

export type GetEventTypesQuery = { __typename?: 'Query', getEventTypes: { __typename?: 'EventTypesData', items: Array<{ __typename?: 'EventTypeData', id: string, name: string }>, meta: { __typename?: 'MetaPaginationInterface', currentPage: number, itemCount: number, itemsPerPage: number, totalItems: number, totalPages: number } } };

export type GetEventsQueryVariables = Exact<{
  input: GetEventsRequest;
}>;
export const GetEventTypesDocument = gql`
    query GetEventTypes($input: QueryFilterDto!) {
  getEventTypes(input: $input) {
    items {
      id
      name
    }
    meta {
      currentPage
      itemCount
      itemsPerPage
      totalItems
      totalPages
    }
  }
}
    `;
    export function useGetEventTypesQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GetEventTypesQuery, GetEventTypesQueryVariables> & ({ variables: GetEventTypesQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
      const options = {...defaultOptions, ...baseOptions}
      return ApolloReactHooks.useQuery<GetEventTypesQuery, GetEventTypesQueryVariables>(GetEventTypesDocument, options);
    }
export function useGetEventTypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventTypesQuery, GetEventTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useLazyQuery<GetEventTypesQuery, GetEventTypesQueryVariables>(GetEventTypesDocument, options);
      }
export function useGetEventTypesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GetEventTypesQuery, GetEventTypesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useSuspenseQuery<GetEventTypesQuery, GetEventTypesQueryVariables>(GetEventTypesDocument, options);
      }
export type GetEventTypesQueryHookResult = ReturnType<typeof useGetEventTypesQuery>;
export type GetEventTypesLazyQueryHookResult = ReturnType<typeof useGetEventTypesLazyQuery>;
export type GetEventTypesSuspenseQueryHookResult = ReturnType<typeof useGetEventTypesSuspenseQuery>;
export type GetEventTypesQueryResult = Apollo.QueryResult<GetEventTypesQuery, GetEventTypesQueryVariables>;
