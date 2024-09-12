"use client"

import * as z from "zod"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import logo from '/public/assets/images/logo.png';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import {
	clearLocalStorage,
	setRefreshToken,
	setToken,
	setUserId,
} from '../../../../lib/token';
import { ROLE } from '../../../../lib/type';
import toast from 'react-hot-toast';
import { SignInDto, useSignInMutation } from "@/graphql/generated"
import { useParams, useRouter } from 'next/navigation';

export const showError = (error: unknown | string) => {
	const message = (() => {
		if (typeof error === 'string') return error;
		return (
			(error as Error)?.message ?? 'Server Internal Error. Please try later.'
		);
	})();

	return toast.error(message);
};

const formSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type LoginFormValues = z.infer<typeof formSchema>

interface LoginFormProps {
  initialData: null;
};

export const LoginForm: React.FC<LoginFormProps> = ({
  initialData
}) => {
  const router = useRouter();
	const [signInMutation, { loading: signInLoading }] = useSignInMutation({
		onCompleted(res) {
			setToken(res.signIn.token);
			localStorage.setItem('role', res.signIn.role?.name || '');
			setRefreshToken(res.signIn.refreshToken);
			setUserId(res.signIn.id);
			router.push(`/`);
		},
		onError: showError,
	});

	const handleSignIn = (input: SignInDto) => {
		signInMutation({
			variables: {
				input,
			},
		});
	};

	const handleLogout = () => {
		router.push('/sign-in');
		clearLocalStorage();
	};

  const action = 'Login';

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    console.log(data);

    handleSignIn(data);
  };

  return (
		<div className="flex flex-col justify-center items-center">
			<Image src={logo} width={100} height={100} alt="logo-orus" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
					<div className="w-full">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											className="border-2 border-white"
											disabled={signInLoading}
											placeholder="Please enter your email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="mb-8 w-full">
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											className="border-2 border-white"
											disabled={signInLoading}
											type="password"
											placeholder="Please enter your password"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

					<Button
						disabled={signInLoading}
						className="bg-[#00000099] grayscale hover:grayscale-0 pl-8 cursor-pointer flex-row space-x-3 w-full text-start h-12 flex items-center rounded-2xl group relative overflow-hidden shadow"
						type="submit"
					>
						<div className="absolute z-0 inset-0 w-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-70 transition-all duration-500 ease-out group-hover:w-full" />
						<Image
							src={logo}
							width={20}
							height={20}
							alt={'imgAltText'}
							className="z-10"
						/>
						<p className="m-0 z-10 font-normal text-sm">{action}</p>
					</Button>
				</form>
			</Form>
		</div>
	);
};
