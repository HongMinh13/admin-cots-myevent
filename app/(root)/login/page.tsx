'use client';
import { LoginForm } from "./components/login-form";

const LoginPage = async ({
  params
}: {
  params: { LoginId: string }
}) => {

  return (
		<div className="bg-background-login-layout bg-cover bg-right w-screen h-screen py-20 px-32">
			<div className="bg-background-login bg-cover bg-center">
				<div className="h-[80vh] grid grid-cols-6">
					<div className="grid grid-cols-12 col-span-3 h-screen md:h-auto">
						<div className="col-end-9 col-span-9 bg-transparent h-full w-full">
							<div className="flex justify-center bg-[#00000099] flex-col items-center h-full text-white px-8">
								<div className="flex-col w-full">
									<div className="flex-1 space-y-4 pt-6">
										<LoginForm initialData={null} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
